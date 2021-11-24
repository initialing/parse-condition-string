const rollup = require("rollup");
const commonjs = require("@rollup/plugin-commonjs");

let inputCofing = {
    input: "index.js",
    plugins: [
        commonjs()
    ]
}

let outputConfig = {
    file: "dist/index.js",
    format: "umd",
    name: "condParse"
}

const build = async function(){
    const bundle = await rollup.rollup(inputCofing);

    await bundle.generate(outputConfig);
    await bundle.write(outputConfig);
}
build();