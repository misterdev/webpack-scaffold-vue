module.exports = () => ({
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "extends": [
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    "rules": {
        "no-empty": [
            "warn"
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 1,
        "no-console": 0
    }
});