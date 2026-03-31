import type { IRecursive, ITokenSchema } from "@/assets/theme/interfaces";

const colors: IRecursive<ITokenSchema<string>> = {
  //primary
  primary: { value: "#2356E8" },

  //secondary
  secondary: { value: "#F2F4F7" },

  // background
  sidebarBgColor: { value: "#F7F9FB" },
  sidebarBgActiveColor: { value: "#EAEEF3" },

  errorColor: { value: "#b82121ff" },
  disabledColor: { value: "#B7C0C8" },

  dividerColor: { value: "#D5E0E8" },
  secondaryFont: { value: "#40505C" },

  successColor: { value: "#2E7D32" },
  headerThTableColor: { value: "#98A2B3" },

  datepickerHeaderBgColor: { value: "#F7F9FB" },
} as const;

export type Colors = typeof colors;

export default colors;
