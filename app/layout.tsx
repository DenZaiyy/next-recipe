import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import React from "react"
import { Toaster } from "react-hot-toast"
import { frFR } from "@clerk/localizations"

export const metadata: Metadata = {
	title: "Next Recipes",
	description: "List of recipes with blog, comments and tags",
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider localization={frFR}>
			<html lang="en">
				<body>
					<header>
						<Navbar />
					</header>
					<main className="p-2 md:p-4">
						<Toaster position={"bottom-right"} />
						{children}
					</main>
				</body>
			</html>
		</ClerkProvider>
	)
}
