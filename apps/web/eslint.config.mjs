import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const upperLayerImports = {
  app: ["@/app/*", "@/views/*", "@/widgets/*", "@/features/*", "@/entities/*"],
  entities: ["@/app/*", "@/views/*", "@/widgets/*", "@/features/*", "@/entities/*"],
  features: ["@/app/*", "@/views/*", "@/widgets/*", "@/features/*"],
  widgets: ["@/app/*", "@/views/*", "@/widgets/*"],
  views: ["@/app/*", "@/views/*"],
};

const deepSliceImports = [
  "@/entities/*/*",
  "@/features/*/*",
  "@/widgets/*/*",
];

function restrictedImports(patterns) {
  return {
    "no-restricted-imports": [
      "error",
      {
        patterns,
      },
    ],
  };
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: restrictedImports(upperLayerImports.app),
  },
  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: restrictedImports([...upperLayerImports.entities, ...deepSliceImports]),
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: restrictedImports([...upperLayerImports.features, ...deepSliceImports]),
  },
  {
    files: ["src/widgets/**/*.{ts,tsx}"],
    rules: restrictedImports([...upperLayerImports.widgets, ...deepSliceImports]),
  },
  {
    files: ["src/views/**/*.{ts,tsx}"],
    rules: restrictedImports([...upperLayerImports.views, ...deepSliceImports]),
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
