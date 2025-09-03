import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],  // ✅ build both
  dts: true,               // ✅ include .d.ts files
  sourcemap: true,
  clean: true,
  external: ["wagmi", "viem"], // ✅ don’t bundle peer deps
});
