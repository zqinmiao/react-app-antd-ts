const path = require('path');

module.exports = {
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser', 
  extends: [
    // Uses the recommended rules from @eslint-plugin-react
    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
    'plugin:react/recommended', 
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018, 
    // Allows for the use of imports
    sourceType: 'module', 
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // Disallow the use of variables before they are defined
    "@typescript-eslint/no-use-before-define": 0,
    // Require explicit return types on functions and class methods
    "@typescript-eslint/explicit-function-return-type": 0,
    // Require that interface names should or should not prefixed with I	
    "@typescript-eslint/interface-name-prefix": 0,
    // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean	
    "@typescript-eslint/no-inferrable-types": 0
  },
};
