"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export const Navbar = () => {
	const [isNavOpen, setIsNavOpen] = useState(false)
	const [activeLink, setActiveLink] = useState("/")
	const pathname = usePathname()

	useEffect(() => {
		setActiveLink(window.location.pathname)
	}, [pathname])

	const handleLinkClick = (path: string) => {
		setActiveLink(path)
		setIsNavOpen(false)
	}

	return (
		<nav className="flex justify-between items-center py-8 px-12 bg-header">
			<Link
				href="/"
				className="font-bold text-3xl text-secondary"
				onClick={() => handleLinkClick("/")}
			>
				MyRecipes
			</Link>
			<section className={"flex lg:hidden"}>
				<div
					className="space-y-2 cursor-pointer group duration-300"
					onClick={() => setIsNavOpen((prev) => !prev)}
				>
					<span
						className={
							"block h-0.5 w-8 animate-pulse bg-gray-600 group-hover:bg-secondary"
						}
					></span>
					<span
						className={
							"block h-0.5 w-8 animate-pulse bg-gray-600 group-hover:bg-secondary"
						}
					></span>
					<span
						className={
							"block h-0.5 w-8 animate-pulse bg-gray-600 group-hover:bg-secondary"
						}
					></span>
				</div>

				<div
					className={
						isNavOpen
							? "absolute top-0 left-0 w-full h-screen bg-header flex flex-col gap-4 justify-evenly items-center z-10"
							: "hidden"
					}
				>
					<div
						className={
							"absolute top-0 right-0 px-8 py-8 cursor-pointer"
						}
						onClick={() => setIsNavOpen(false)}
					>
						<X size={32} />
					</div>
					<ul className="flex flex-col items-center justify-between min-h-[250px]">
						<Link
							href="/recipe"
							className={`${
								activeLink === "/recipe" ||
								pathname.startsWith("/recipe/")
									? "text-secondary hover:text-foreground"
									: "text-white dark:text-foreground hover:text-secondary"
							} duration-200 text-xl font-medium`}
							onClick={() => handleLinkClick("/recipe")}
						>
							Recipes
						</Link>
						<Link
							href="/search"
							className={`${
								activeLink === "/search" ||
								pathname.startsWith("/search/")
									? "text-secondary hover:text-foreground"
									: "text-white dark:text-foreground hover:text-secondary"
							} duration-200 text-xl font-medium`}
							onClick={() => handleLinkClick("/search")}
						>
							Search
						</Link>
						<Link
							href="/blog"
							className={`${
								activeLink === "/blog" ||
								pathname.startsWith("/blog/")
									? "text-secondary hover:text-foreground"
									: "text-white dark:text-foreground hover:text-secondary"
							} duration-200 text-xl font-medium`}
							onClick={() => handleLinkClick("/blog")}
						>
							Blog
						</Link>
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<Link
								href="/sign-in"
								className="text-foreground hover:text-secondary duration-200 text-xl font-medium"
							>
								Se connecter
							</Link>
							<Link
								href="/sign-up"
								className="text-foreground hover:text-secondary duration-200 text-xl font-medium"
							>
								S&apos;inscrire
							</Link>
						</SignedOut>
					</ul>
				</div>
			</section>
			<ul className="hidden lg:flex lg:items-center gap-6">
				<Link
					href="/recipe"
					className={`${
						activeLink === "/recipe" ||
						pathname.startsWith("/recipe/")
							? "text-secondary hover:text-foreground"
							: "text-white dark:text-foreground hover:text-secondary"
					} duration-200 text-xl font-medium`}
				>
					Recipes
				</Link>
				<Link
					href="/search"
					className={`${
						activeLink === "/search" ||
						pathname.startsWith("/search/")
							? "text-secondary hover:text-foreground"
							: "text-white dark:text-foreground hover:text-secondary"
					} duration-200 text-xl font-medium`}
				>
					Search
				</Link>
				<Link
					href="/blog"
					className={`${
						activeLink === "/blog" || pathname.startsWith("/blog/")
							? "text-secondary hover:text-foreground"
							: "text-white dark:text-foreground hover:text-secondary"
					} duration-200 text-xl font-medium`}
				>
					Blog
				</Link>
				<SignedIn>
					<UserButton />
					<Link
						href="/meal"
						className={`${
							activeLink === "/meal" ||
							pathname.startsWith("/meal/")
								? "text-secondary hover:text-foreground"
								: "text-white dark:text-foreground hover:text-secondary"
						}
                                duration-200 text-xl font-medium`}
					>
						Meal Planner
					</Link>
				</SignedIn>
				<SignedOut>
					<Link
						href="/sign-in"
						className="text-foreground hover:text-secondary duration-200 text-xl font-medium"
					>
						Se connecter
					</Link>
					<Link
						href="/sign-up"
						className="text-foreground hover:text-secondary duration-200 text-xl font-medium"
					>
						S&apos;inscrire
					</Link>
				</SignedOut>
				<ThemeSwitcher />
			</ul>
		</nav>
	)
}
