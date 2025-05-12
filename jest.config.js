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
	// Ajouter le setup des fichiers
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	// Ignorer certains dossiers
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/.next/'
	],
	// Pour gérer les imports de CSS et autres fichiers statiques
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
	},
	reporters: ['default', ['jest-junit', { outputDirectory: './test-results' }]],
};

module.exports = config;