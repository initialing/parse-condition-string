import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "./src/index.ts",
    plugins: [
        typescript({
            module: "ESNext",
        }),
        commonjs({
            extensions: [".js", ".ts"],
            defaultIsModuleExports: false,
        }),
    ],
    output: {
        file: "dist/index.js",
        format: "cjs",
        name: "condParse",
    },
};
