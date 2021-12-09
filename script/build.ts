import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import type { OutputOptions } from "rollup";

const inputCofing = {
    input: "src/index.ts",
    plugins: [
        typescript({
            module: "ESNext",
        }),
        commonjs({
            extensions: [".js", ".ts"],
        }),
    ],
};

const outputConfigs: Array<OutputOptions> = [
    {
        file: "./dist/cond.js",
        format: "cjs",
        name: "condParse",
    },
    {
        file: "./dist/cond.mjs",
        format: "esm",
        name: "condParse",
    },
    {
        file: "./dist/index.js",
        format: "umd",
        name: "condParse",
    },
];

const build = async function () {
    const bundle = await rollup(inputCofing);

    outputConfigs.map(async (conf) => {
        await bundle.generate(conf);
        await bundle.write(conf);
    });
};
build();
