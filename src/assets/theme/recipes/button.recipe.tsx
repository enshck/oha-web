import { defineRecipe } from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "medium",
    borderRadius: "base",
    transition: "all 0.2s",
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "primary",
        color: "white",
        _hover: {
          bg: "primaryHover",
        },
        _active: {
          bg: "primary",
        },
      },
      outline: {
        border: "1px solid",
        borderColor: "primary",
        color: "primary",
        bg: "transparent",
        _hover: {
          bg: "primary",
          color: "white",
        },
      },
      ghost: {
        color: "primary",
        bg: "transparent",
        _hover: {
          bg: "primaryLight",
        },
      },
    },
    size: {
      xs: {
        h: "40px",
        minW: "24px",
        fontSize: "12px",
        px: "8px",
      },
      sm: {
        h: "40px",
        minW: "32px",
        fontSize: "14px",
        px: "12px",
      },
      md: {
        h: "40px",
        minW: "40px",
        fontSize: "16px",
        px: "16px",
      },
      lg: {
        h: "40px",
        minW: "48px",
        fontSize: "18px",
        px: "20px",
      },
      xl: {
        h: "40px",
        minW: "56px",
        fontSize: "20px",
        px: "24px",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

export default buttonRecipe;
