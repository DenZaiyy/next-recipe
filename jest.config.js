/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
	},
};

module.exports = config;