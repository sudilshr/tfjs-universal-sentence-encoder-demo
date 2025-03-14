{
    module.exports = {
        "env": {
            "browser": true,
            "es6": true // Add this line to enable ES6 support
        },
        "extends": "eslint:recommended",
        "parserOptions": {
            "ecmaVersion": 8,
            "sourceType": "module"
          },
        "rules": {
            "indent": [
                "error",
                "tab"
            ],
            "linebreak-style": [
                "error",
                "unix"
            ],
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "always"
            ],
            "no-console": "off",

        }
    };
}