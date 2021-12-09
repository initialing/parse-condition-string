module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    plugins: ["@typescript-eslint", "prettier"],
    overrides: [
        {
            files: ["test.js", "test.ts"],
            rules: {
                "no-undef": "off",
            },
        },
    ],
    rules: {
        "no-constant-condition": 0,
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                singleQuote: false,
            },
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
};
