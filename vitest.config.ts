import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/domain/**/*.ts"],
      thresholds: {
        lines: 90,
        statements: 90,
        branches: 90,
        functions: 90,
      },
    },
  },
});
