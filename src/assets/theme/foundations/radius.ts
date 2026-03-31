import type { IRecursive, ITokenSchema } from "@/assets/theme/interfaces";

const borderRadius: IRecursive<ITokenSchema<string>> = {
  none: { value: "0px" },
  small: { value: "6px" },
  base: { value: "8px" },
  table: { value: "12px" },
  medium: { value: "14px" },
  large: { value: "24px" },
  full: { value: "9999px" },
} as const;

export type Radius = typeof borderRadius;

export default borderRadius;
