export const NamesOfRoutes = {
  APP: "/",
  DASHBOARD: {
    ROOT: "/dashboard",
  },
} as const;

export const NamesOfChildRoutes = {
  DASHBOARD: {
    ROOT: "/dashboard",
    INDEX: "/",
  },
  DEFAULT_REDIRECT: "/*",
} as const;
