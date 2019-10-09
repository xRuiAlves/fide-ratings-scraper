module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest/globals": true,
    },

    "plugins": [
      "jest"
    ],
  
    "globals": {
        "jsdom": true,
    },
  
    "parserOptions": {
      "ecmaVersion": 2018,
      "ecmaFeatures": {
        "jsx": true,
      },
    },
  
    "extends": [
      "eslint:recommended",
    ],
  
    "rules": {
      // Possible Errors
      "no-misleading-character-class": "error",
      "no-template-curly-in-string": "error",
      "no-console": "warn",
  
      // Best practices
      "consistent-return": "error",
      "default-case": "error",
      "eqeqeq": "error",
      "no-eq-null": "error",
      "no-param-reassign": "error",
      "no-return-assign": "error",
      "no-return-await": "error",
      "require-await": "error",
      "radix": "error",
  
      // Variables
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-shadow-restricted-names": "error",
  
      // Stylistic issues
      "array-bracket-spacing": "error",
      "block-spacing": ["error", "always"],
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "always-multiline"
      }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "comma-style": ["error", "last"],
      "computed-property-spacing": ["error", "never"],
      "eol-last": ["error", "always"],
      "indent": ["error", 4, { "SwitchCase": 1 }],
      "jsx-quotes": ["error", "prefer-double"],
      "key-spacing": ["error", { "beforeColon": false }],
      "keyword-spacing": "error",
      "max-len": ["error", { "code": 140 }],
      "new-parens": "error",
      "no-mixed-operators": "error",
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "no-trailing-spaces": "error",
      "no-tabs": "error",
      "object-curly-spacing": ["error", "always"],
      "prefer-object-spread": "error",
      "quotes": ["error", "double"],
      "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
      "semi-spacing": ["error", { "before": false, "after": true }],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }],
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": ["error", {
        "words": true,
        "nonwords": false,
      }],
      "spaced-comment": ["error", "always", { "exceptions": ["-"] }],
      "switch-colon-spacing": ["error", {
        "after": true,
        "before": false
      }],
  
      // ECMAScript 6
      "arrow-spacing": "error",
      "arrow-body-style": ["error", "as-needed"],
      "arrow-parens": ["error", "always"],
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": ["error", { "destructuring": "all" }],
      "prefer-template": "error",
      "template-curly-spacing": "error",
    },
};
  