module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "no-unsafe-regex",
		"prefer-object-spread",
		"security",
		"simple-import-sort",
		"babel",
  ],
	extends: [
		"eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:security/recommended",
  ],
  rules: {
		// stuff that's on
		"simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "babel/no-unused-expressions": 2,
    "new-cap": [
			2,
			{
				newIsCap: true,
				capIsNew: false,
			},
    ],
    "no-unsafe-regex/no-unsafe-regex": 2,
		"quotes": [2, "double", { "avoidEscape": true }],
		"eol-last": [2, "always"],

    // stuff that gives warnings
		"array-callback-return": 1,
		camelcase: 1,
		"consistent-return": 1,
		"no-param-reassign": 1,
		"no-return-assign": 1,
		"prefer-const": 1,
		"prefer-template": 1,
		"no-lonely-if": 1,
		"no-restricted-properties": 1,
		"no-useless-escape": 1,
		"prefer-object-spread/prefer-object-spread": 1,
		"valid-jsdoc": [
			1,
			{
				requireReturn: false,
				requireReturnType: false,
				requireParamDescription: true,
				requireReturnDescription: false,
			},
		],

  }
}