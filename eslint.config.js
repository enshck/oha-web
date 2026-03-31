import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  // Ignore build and output folders
  { ignores: ["dist"] },

  // Main configuration for TypeScript + React
  {
    files: ["**/*.{ts,tsx}"],

    // ECMAScript and global settings
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Adds browser globals like window, document, etc.
      },
    },

    // Base and recommended configs
    extends: [
      js.configs.recommended, // ESLint's built-in recommended rules
      ...tseslint.configs.recommended, // TypeScript plugin recommended rules
    ],

    // Enable additional ESLint plugins
    plugins: {
      "react-hooks": reactHooks, // React Hooks rules
      "react-refresh": reactRefresh, // React Fast Refresh rules
      import: importPlugin, // Import ordering and validation rules
    },

    // Custom rules
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Enforce consistent import order and grouping
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // Third-party and built-in modules
            ["internal"], // Internal imports (like "@/components")
            ["parent", "sibling", "index"], // Relative imports
          ],
          pathGroups: [
            {
              pattern: "@/**", // Match internal imports starting with "@/"
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always", // Enforce a blank line between groups
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // Disable rules not relevant for your project
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
]);
