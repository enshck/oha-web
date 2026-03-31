import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import foundations from "./foundations";
import globalCss from "./global";
import recipes from "./recipes";

const config = defineConfig({
  globalCss,
  theme: {
    tokens: {
      colors: foundations.colors,
      shadows: foundations.shadows,
      radii: foundations.borderRadius,
      fontWeights: foundations.fontWeight,
      zIndex: foundations.zIndex,
    },
    textStyles: foundations.textStyles,
    recipes,
  },
});

export default createSystem(defaultConfig, config);
