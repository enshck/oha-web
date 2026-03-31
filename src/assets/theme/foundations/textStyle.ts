import { defineTextStyles } from "@chakra-ui/react";

const textStyles = defineTextStyles({
  label: {
    description: "Label text style",
    value: {
      fontSize: "12px",
      fontWeight: "normal",
      lineHeight: "16px",
    },
  },
  title: {
    description: "Title text style",
    value: {
      fontSize: "24px",
      fontWeight: "bold",
      lineHeight: "32px",
    },
  },
});

export default textStyles;
