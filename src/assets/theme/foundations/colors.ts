import type { IRecursive, ITokenSchema } from "@/assets/theme/interfaces";

const colors: IRecursive<ITokenSchema<string>> = {
  //primary
  primary: { value: "#2356E8" },

  //secondary
  secondary: { value: "#F2F4F7" },

  // background
  headerBgColor: { value: "#F7F9FB" },

  errorColor: { value: "#b82121ff" },
  disabledColor: { value: "#B7C0C8" },

  dividerColor: { value: "#D5E0E8" },
  secondaryFont: { value: "#40505C" },
} as const;

export type Colors = typeof colors;

export default colors;
