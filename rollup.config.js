import commonjs from "rollup-plugin-commonjs"

export default {
    input: "index.js",
    plugins: [
        commonjs()
    ],
    output: {
        file: "dist/index.js",
        format: "umd",
        name: "condParse"
    }
}