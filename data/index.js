// data/index.js
let explore = [
  { id: "womens-suit", name: "Women's Suit" },
  { id: "designer-collection", name: "Designer Collection" },
  { id: "spring-collection", name: "Spring Collection" },
  { id: "new-arrivals", name: "New Arrivals" },
  { id: "top-trends", name: "Top Trends" },
];

export const clients = [
  {
    username: "gallery",
    hosts: ["gallery.gkrane.online"],
    name: "Gallery",
    type: "gallery",
    package: "gallery",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Home",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/home",
            },
            {
              label: "Settings",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/settings",
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },
    },
    administrators: [
      {
        email: "theyatsarbrand@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },
  {
    username: "games",
    hosts: ["games.gkrane.online"],
    name: "Gamer",
    type: "games",
    package: "games",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Home",
              icon: {
                active: "MaterialSymbolsHome.svg",
                inactive: "MaterialSymbolsHome.svg",
              },
              route: "/home",
            },
            {
              label: "Profile",
              icon: {
                active: "MaterialSymbolsPerson.svg",
                inactive: "MaterialSymbolsPerson.svg",
              },
              route: "/profile",
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },
      games: [
        {
          id: "chess",
          name: "Chess",
          image:
            "https://storage.googleapis.com/great-unknown.appspot.com/images/games/chess/cover.png",
        },
        {
          id: "ludo",
          name: "Ludo",
          image:
            "https://storage.googleapis.com/great-unknown.appspot.com/images/games/ludo/cover.png",
        },
        {
          id: "monopoly",
          name: "Monopoly",
          image:
            "https://storage.googleapis.com/great-unknown.appspot.com/images/games/monopoly/cover.png",
        },
      ],
    },
    administrators: [
      {
        email: "theyatsarbrand@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },
  {
    username: "yatsar",
    hosts: ["yatsar.gkrane.online", "yatsar.store"],
    name: "Yatsar",
    type: "skincare",
    package: "store",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Home",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/home",
            },
            {
              label: "Shop",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/shop",
            },
            {
              label: "Wishlist",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/wishlist",
            },
            {
              label: "Cart",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/cart",
            },
            {
              label: "Profile",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/profile",
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },

      explore,
    },
    administrators: [
      {
        email: "theyatsarbrand@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },

  {
    username: "stores",
    hosts: ["stores.gkrane.online"],
    name: "Stores",
    type: "stores",
    package: "stores",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Home",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/home",
            },
            {
              label: "Wishlist",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/wishlist",
            },
            {
              label: "Settings",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/settings",
            },
            {
              label: "Profile",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/profile",
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },
    },
    administrators: [
      {
        email: "theyatsarbrand@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },
  {
    username: "creatyve3d",
    hosts: ["creatyve3d.pro"],
    name: "Creative 3D",
    type: "professional",
    package: "dotpro",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Projects",
              route: "/projects",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
            {
              label: "About",
              route: "/about",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
            {
              label: "Contact",
              route: "/contact",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },
    },

    administrators: [
      {
        email: "theyatsarbrand@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },
  {
    username: "contacts",
    hosts: ["contacts.gkrane.online"],
    name: "Contacts",
    type: "contacts",
    package: "contacts",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Projects",
              route: "/projects",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
            {
              label: "About",
              route: "/about",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
            {
              label: "Contact",
              route: "/contact",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },
    },

    administrators: [
      {
        email: "theyatsarbrand@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },
  {
    username: "bolt-investment",
    hosts: ["augmentplus.space"],
    name: "Bolt Investment",
    type: "property-investment",
    package: "dotproperty",
    content: {
      navigation: {
        drawer: {
          bottom: [],
        },
        sidebar: {
          left: [
            {
              label: "Dashboard",
              icon: "",
              link: "/dashboard",
            },
            {
              label: "Business Suites",
              icon: "",
              link: "/dashboard",
            },
            {
              label: "Rental Incomes",
              icon: "",
              link: "/dashboard",
            },
            {
              label: "Fractional Owners",
              icon: "",
              link: "/settings",
            },
            {
              label: "Plaza Projects",
              icon: "",
              link: "/settings",
            },
            {
              label: "Investment Performance",
              icon: "",
              link: "/settings",
            },
          ],
        },
        top: [],
      },
    },

    administrators: [
      {
        email: "theyatsarbrand@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },
  {
    username: "genesiskrane",
    hosts: ["gkrane.online"],
    name: "Genesis Krane",
    type: "krane",
    package: "krane",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Apps",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/apps",
            },
            {
              label: "Games",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/games",
            },
            {
              label: "Settings",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/settings",
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },
    },

    administrators: [
      {
        email: "genesiskrane@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },

  {
    username: "fairpay",
    hosts: ["fairpay.gkrane.online"],
    name: "Fairpay",
    type: "payment-splitter",
    package: "payment-splitter",
    content: {
      navigation: {
        drawer: {
          bottom: [
            {
              label: "Home",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/home",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
            {
              label: "Split",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/split",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
            {
              label: "Settings",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
              route: "/settings",
              icon: {
                active: "fairpay-pie-filled.png",
                inactive: "fairpay-pie-outline.png",
              },
            },
          ],
        },
        sidebar: {
          left: [],
        },
        top: [],
      },
    },

    administrators: [
      {
        email: "genesiskrane@gmail.com",
        password: "12345678",
        role: "owner",
      },
    ],
  },
];

const domains = {
  stores: [],
  clients: [
    "gallery",
    "games",
    "stores",
    "professionals",
    "contacts",
    "realty",
  ],
};

export const getDomains = () => domains;
export const setDomains = (type, names) => (domains[type] = names);
