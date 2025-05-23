import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export const ThemeSwitcher = () => {
	const [theme, setTheme] = useState("dark")

	useEffect(() => {
		document.body.classList.toggle("dark", theme === "dark")
		document.body.classList.toggle("light", theme === "light")
	}, [theme])

	useEffect(() => {
		const data = localStorage.getItem("theme")
		if (data) setTheme(data)
	}, [])

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark")
	}

	useEffect(() => {
		localStorage.setItem("theme", theme)
	}, [theme])

	return (
		<>
			<button
				onClick={toggleTheme}
				className={"p-2 rounded-full bg-background"}
			>
				{theme === "dark" ? (
					<Sun color="#fff700" />
				) : (
					<Moon color="#E46A58" />
				)}
			</button>
		</>
	)
}
