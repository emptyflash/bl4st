import {nodeResolve} from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve";

export default {
  input: "./main.js",
  treeshake: false,
  output: {
    file: "./bundle.js",
    format: "esm"
  },
  plugins: [
    nodeResolve(),
  ],
}
