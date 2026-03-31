import type { IRecursive, ITokenSchema } from "@/assets/theme/interfaces";

const shadows: IRecursive<ITokenSchema<string>> = {
  xsmall: { value: "0px 1px 2px 0px rgba(198, 228, 246, 0.05)" },
  small: { value: "0px 3px 7px 0px rgba(35, 86, 232, 0.24)" },
  normal: { value: "0px 6px 15px 0px rgba(35, 33, 65, 0.05)" },
  tooltip: { value: "0px 8px 16px 0px rgba(35, 33, 65, 0.12)" },
} as const;

export default shadows;
