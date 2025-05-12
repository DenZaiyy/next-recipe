import "@testing-library/jest-dom"

// Suppression des avertissements liés aux props non utilisés (optionnel)
const originalConsoleError = console.error;
console.error = (...args) => {
	if (
		/Warning: React does not recognize the.*prop on a DOM element/.test(args[0]) ||
		/Warning: The tag.*is unrecognized in this browser/.test(args[0]) ||
		/Warning: validateDOMNesting/.test(args[0])
	) {
		return;
	}
	originalConsoleError(...args);
};