import type { Metadata } from "next"
import { Merriweather } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import React from "react"
import { Toaster } from "react-hot-toast"
import { frFR } from "@clerk/localizations"

const merriWeather = Merriweather({
	weight: ["300", "400", "700", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
})

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
				<body className={`${merriWeather.className} antialiased`}>
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
