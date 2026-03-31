import type { IRecursive, ITokenSchema } from "@/assets/theme/interfaces";

const fontWeight: IRecursive<ITokenSchema<string>> = {
  thin: { value: "100" },
  extralight: { value: "200" },
  light: { value: "300" },
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
  extrabold: { value: "800" },
  black: { value: "900" },
} as const;

export type FontWeight = typeof fontWeight;

export default fontWeight;
