import { defineRecipe } from "@chakra-ui/react";

const inputRecipe = defineRecipe({
  defaultVariants: {
    variant: "outline",
  },
  base: {
    h: "40px",
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "24px",
    _autofill: {
      transition: "background-color 1000s ease-in-out 0s",
    },
  },
  variants: {
    variant: {
      outline: {
        boxShadow: "none",
        _invalid: {
          boxShadow: "none",
          borderColor: "errorColor",
        },
        _focusVisible: {
          boxShadow: "none",
          borderColor: "none",
          outlineStyle: "none",
        },
        _disabled: {
          background: "disabledColor",
          opacity: 1,
          color: "captionText",
        },
      },
    },
  },
});

export default inputRecipe;
