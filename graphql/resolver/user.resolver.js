// /graphql/resolvers/account.resolver.js
import jwt from "jsonwebtoken";

import crypto from "crypto";

import { filterUserByHost } from "../../utility/index.js";

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, VITE_DEVELOPMENT_KEY } =
  process.env;

async function generateTokens(userId) {
  const accessToken = jwt.sign({ id: userId }, JWT_ACCESS_SECRET, {
    expiresIn: "30d",
  });
  const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
}

function generateUsername() {
  return `user_${crypto.randomUUID().slice(0, 8)}`;
}

function parseFullname(fullname = "") {
  if (!fullname || typeof fullname !== "string") {
    return { first: "", middle: "", last: "" };
  }

  const parts = fullname.trim().replace(/\s+/g, " ").split(" ");

  return {
    first: parts[0] || "",
    middle: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
    last: parts.length > 1 ? parts[parts.length - 1] : "",
  };
}

export const userResolver = {
  Query: {
    user: async (_, __, { host, db, id }) => {
      // identity comes from the token (user id, email, or username)
      if (!id) {
        throw new Error("Unauthorized: No identity found");
      }

      let user;

      // Find user by _id, username, or email
      user = await db.main.models.User.findOne({ _id: id });

      if (!user) {
        throw new Error("User not found");
      }

      user = filterUserByHost(host, user);

      return {
        id: user._id,
        name: user.name,
        username: "test",
        email: "123@abc.com",
        createdAt: Date.now(),
      };
    },
  },
  Mutation: {
    /**
     * Create a new user account
     */
    signup: async (_, { input }, { db }) => {
      const { appName, fullname, username, email, password } = input;

      console.log(input);

      if (!email || !password) {
        return {
          token: null,
          refreshToken: null,
          user: null,
          error: {
            code: "MISSING_FIELDS",
            message: "Email and password are required",
          },
        };
      }

      try {
        // 1️⃣ Check if user exists
        const existing = await db.main.models.User.findOne({
          $or: [{ email }, ...(username ? [{ username }] : [])],
        });

        if (existing) {
          return {
            token: null,
            refreshToken: null,
            user: null,
            error: {
              code: "USER_EXISTS",
              message: "User already exists",
            },
          };
        }

        // 2️⃣ Parse fullname
        const name = parseFullname(fullname);

        // 3️⃣ Generate ID + username
        const id = crypto.randomUUID().replace(/-/g, "");
        const finalUsername = username
          ? username.toLowerCase()
          : generateUsername();

        // 4️⃣ Create user
        const user = await db.main.models.User.create({
          _id: id,
          username: finalUsername,
          email,
          password,
          name,
          apps: [appName],
        });

        // 5️⃣ Generate tokens
        const { accessToken, refreshToken } = await generateTokens(user._id);

        // 6️⃣ Save refresh token
        user.refreshToken = refreshToken;
        await user.save();

        return {
          token: accessToken,
          refreshToken,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
          },
          error: null,
        };
      } catch (err) {
        console.error("Signup resolver error:", err);

        return {
          token: null,
          refreshToken: null,
          user: null,
          error: {
            code: "SIGNUP_FAILED",
            message: err.message,
          },
        };
      }
    },

    /**
     * Sign in existing user
     */
    signin: async (_, { input }, { db }) => {
      const { identifier, password, appName } = input; // expect appName in input

      try {
        const user = await db.main.models.User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        }).select("+password");

        if (!user) {
          return {
            token: null,
            refreshToken: null,
            user: null,
            error: {
              code: "INVALID_CREDENTIALS",
              message: "Invalid credentials",
            },
          };
        }

        const valid = await user.comparePassword(password);
        if (!valid) {
          return {
            token: null,
            refreshToken: null,
            user: null,
            error: {
              code: "INVALID_CREDENTIALS",
              message: "Invalid credentials",
            },
          };
        }

        // ✅ Add appName to apps array if not already present
        if (appName && !user.apps.includes(appName)) {
          user.apps.push(appName);
          await user.save();
        }

        const { accessToken, refreshToken } = await generateTokens(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        return {
          token: accessToken,
          refreshToken,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            apps: user.apps,
          },
          error: null,
        };
      } catch (err) {
        console.error("Signin resolver error:", err);
        return {
          token: null,
          refreshToken: null,
          user: null,
          error: { code: "SIGNIN_FAILED", message: err.message },
        };
      }
    },
    /**
     * Refresh access token using refresh token
     */
    refreshToken: async (_, { token }, { db }) => {
      try {
        // 1️⃣ Find user by refresh token
        const user = await db.main
          .collection("accounts")
          .findOne({ refreshToken: token });

        if (!user) {
          return {
            token: null,
            refreshToken: null,
            user: null,
            error: {
              code: "INVALID_REFRESH",
              message: "Invalid refresh token",
            },
          };
        }

        // 2️⃣ Generate new tokens
        const { accessToken, refreshToken } = await generateTokens(user._id);

        // 3️⃣ Update refresh token in DB
        await db.main
          .collection("accounts")
          .updateOne({ _id: user._id }, { $set: { refreshToken } });

        return {
          token: accessToken,
          refreshToken,
          user: { id: user._id, username: user.username, email: user.email },
          error: null,
        };
      } catch (err) {
        console.error("Refresh token resolver error:", err);
        return {
          token: null,
          refreshToken: null,
          user: null,
          error: { code: "REFRESH_FAILED", message: err.message },
        };
      }
    },
  },
};
