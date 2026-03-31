import type { IRecursive, ITokenSchema } from "@/assets/theme/interfaces";

const zIndex: IRecursive<ITokenSchema<number>> = {
  modal: { value: 1000 },
  sidebar: { value: 1000 },
} as const;

export default zIndex;
