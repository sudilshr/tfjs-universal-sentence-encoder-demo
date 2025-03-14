module.exports = {
    "env": {
        "browser": true,
        "es6": true // Add this line to enable ES6 support
    },
    "extends": "eslint:recommended",
    "parserOptions": {  // Add this section
        "ecmaVersion": 2018, // or 2020, 2021, etc.  Use the year corresponding to the ES version you want to support
        "sourceType": "module" // Add this line to specify module type
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