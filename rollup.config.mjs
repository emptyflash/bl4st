import {nodeResolve} from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve";

export default {
  input: "./bl4st.js",
  output: {
    file: "./bundle.js",
    format: "iife"
  },
  plugins: [
    nodeResolve(),
  ],
}
