import { render, screen } from "@testing-library/react"
import Home from "../app/page" // Ajustez le chemin selon votre structure

// Mock complet de Clerk
jest.mock("@clerk/nextjs", () => ({
	useUser: jest.fn(() => ({
		isLoaded: true,
		isSignedIn: true,
		user: {
			id: "user_123",
			fullName: "Test User",
			// Ajoutez d'autres propriétés selon vos besoins
		},
	})),
}))

describe("Home Page", () => {
	it("renders main heading and description", () => {
		render(<Home />)

		// Vérification du titre principal
		expect(screen.getByText("MyRecipes")).toBeInTheDocument()
		expect(
			screen.getByText("NextJS website to learn more about NextJS"),
		).toBeInTheDocument()
	})

	it("renders functionalities section with list items", () => {
		render(<Home />)

		expect(screen.getByText("Functionalities")).toBeInTheDocument()
		expect(screen.getByText("Authentication")).toBeInTheDocument()
		expect(screen.getByText("Theme Switcher")).toBeInTheDocument()
		expect(screen.getByText("Blog")).toBeInTheDocument()
		expect(screen.getByText("Comments")).toBeInTheDocument()
		expect(screen.getByText("CRUD")).toBeInTheDocument()
	})

	it("renders dependencies section with list items", () => {
		render(<Home />)

		expect(screen.getByText("Dependencies")).toBeInTheDocument()
		expect(screen.getByText("NextJS")).toBeInTheDocument()
		expect(screen.getByText("Typescript")).toBeInTheDocument()
		expect(screen.getByText("Clerk")).toBeInTheDocument()
		// Vous pouvez ajouter d'autres dépendances si nécessaire
	})
})