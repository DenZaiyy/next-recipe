import { defineConfig } from "cypress"

export default defineConfig({
	projectId: "bqk5cf",
	e2e: {
		baseUrl: "http://localhost:3000",
		defaultCommandTimeout: 10000, // 10 seconds
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
})
