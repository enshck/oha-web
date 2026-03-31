import { useMemo } from "react";

import { debounce } from "@/shared/utils";

export function useDebouncedFunction<T extends (...args: never[]) => unknown>(func?: T, delay: number = 500) {
  return useMemo(() => {
    if (!func) return;

    return debounce(func, delay);
  }, [func, delay]);
}
