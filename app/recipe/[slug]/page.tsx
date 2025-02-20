"use client"

import React, { use, useEffect, useState } from "react"
import { fetchRecipe } from "@/hooks/recipe/fetchRecipe"
import { Category } from "@/components/Category"
import Image from "next/image"
import { Duration } from "@/components/Duration"
import { DifficultyGauge } from "@/components/DifficultyGauge"
import { Comment } from "@/components/Comment"
import {
	CookingPot,
	Download,
	Heart,
	Lightbulb,
	ListChecks,
	MessageSquareQuote,
	Waypoints,
} from "lucide-react"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import toast from "react-hot-toast"
import { Swiper, SwiperSlide } from "swiper/react"
import { SwiperOptions } from "swiper/types"
import { Pagination, Scrollbar } from "swiper/modules"
import "swiper/css"
import "swiper/css/bundle"
import { fetchSuggest } from "@/hooks/recipe/fetchSuggest"
import { RecipeCard } from "@/components/RecipeCard"
import { useUser } from "@clerk/nextjs"

//import {RecipeCard} from "@/components/RecipeCard";

interface TRecipeProps {
	params: Promise<{ slug: string }>
}

const swiperParams: SwiperOptions = {
	modules: [Pagination, Scrollbar],
	spaceBetween: 10,
	slidesPerView: 2,
	pagination: { clickable: true },
	effect: "fade",
	grabCursor: true,
	watchSlidesProgress: true,
	watchOverflow: false,
}

const RecipeDetail = ({ params }: TRecipeProps) => {
	const { slug } = use(params)

	const [recipe, setRecipe] = useState<TRecipe>()
	const [favorites, setFavorites] = useState<TRecipe[]>([])
	const [suggestions, setSuggestions] = useState<TRecipe[]>([])

	const { user, isSignedIn } = useUser()

	useEffect(() => {
		const loadRecipe = async () => {
			try {
				const data = await fetchRecipe(slug)
				setRecipe(data)
			} catch (error) {
				console.error("[RECIPE DETAIL] ", error)
			}
		}

		loadRecipe()
	}, [slug])

	useEffect(() => {
		const loadSuggestions = async () => {
			if (recipe) {
				try {
					const data = await fetchSuggest(
						recipe.category.id,
						recipe.id,
					)
					console.log(data)
					setSuggestions(data)
				} catch (error) {
					console.error("[SUGGESTIONS] ", error)
				}
			}
		}

		loadSuggestions()
	}, [recipe])

	const handleFavorite = (recipe: TRecipe) => {
		const storedFavorites = JSON.parse(
			localStorage.getItem("favorites") || "[]",
		)
		const currentRecipe = storedFavorites.find(
			(recp: TRecipe) => recp.id === recipe.id,
		)

		if (currentRecipe) {
			toast.success(
				`${recipe ? recipe.title : "Recipe"} removed from favorites`,
			)
			const updatedFavorites = storedFavorites.filter(
				(recp: TRecipe) => recp.id !== recipe.id,
			)
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
			setFavorites(updatedFavorites)
		} else {
			toast.success(
				`${recipe ? recipe.title : "Recipe"} added to favorites`,
			)
			const updatedFavorites = [...storedFavorites, recipe]
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
			setFavorites(updatedFavorites)
		}
	}

	useEffect(() => {
		const storedFavorites = JSON.parse(
			localStorage.getItem("favorites") || "[]",
		)
		setFavorites(storedFavorites)
	}, [])

	return (
		<div className={"flex flex-col gap-8 md:pt-4 md:px-12"}>
			<div
				className={
					"w-full rounded-lg bg-header md:h-[400px] flex flex-col md:flex-row md:justify-between"
				}
			>
				<div className="flex flex-col p-4 w-full md:w-1/2 items-center justify-center gap-4">
					<h1 className={"text-2xl md:text-4xl font-bold"}>
						{recipe?.title}
					</h1>
					<div className={"flex gap-4 items-center"}>
						{recipe?.category && (
							<div>
								<Category
									category={recipe.category}
									size={"text-lg"}
								/>
							</div>
						)}
						{recipe?.duration && (
							<div>
								<Duration
									duration={recipe.duration}
									size={24}
									textSize={"text-lg"}
								/>
							</div>
						)}
						{recipe?.difficulty && (
							<div className={"flex"}>
								<DifficultyGauge
									difficulty={recipe.difficulty}
								/>
							</div>
						)}
					</div>
					<div className="flex gap-2">
						<button
							className={
								"text-white text-sm font-medium flex gap-2 items-center rounded-full bg-secondary px-4 py-2 group"
							}
						>
							<Download
								className={"group-hover:scale-110 duration-200"}
							/>
							Download
						</button>
						<button
							className={
								"text-white text-sm font-medium flex gap-2 items-center rounded-full bg-secondary px-4 py-2 group duration-300"
							}
							onClick={() => handleFavorite(recipe!)}
						>
							<Heart
								fill={
									favorites.some(
										(recp) => recp.id === recipe?.id,
									)
										? "red"
										: "none"
								}
								className={"group-hover:scale-110 duration-200"}
							/>
							Favorite
						</button>
					</div>
				</div>
				{recipe?.image && (
					<div className="md:w-1/2 h-full">
						<Image
							src={recipe?.image}
							alt={recipe?.title}
							width={300}
							height={300}
							className={"h-full w-full object-cover rounded-lg"}
						/>
					</div>
				)}
			</div>
			<div className="w-full flex flex-col md:flex-row gap-8">
				<div className="md:w-1/2">
					<h2>
						<ListChecks /> Instructions
					</h2>
					<p className="font-medium text-foreground text-lg leading-relaxed text-justify">
						{recipe?.instructions}
					</p>
				</div>
				<div className="md:w-1/2 h-full">
					<h2>
						<CookingPot /> Ingredients and Tools
					</h2>
					<TabGroup
						className={"border border-slate-600/50 rounded-md"}
					>
						<TabList className="flex p-2 bg-header font-bold rounded-md duration-300">
							<Tab
								className={
									"rounded-md py-2 px-4 focus:outline-none data-[selected]:bg-secondary data-[hover]:bg-secondary/50 data-[selected]:data-[hover]:bg-secondary/10 data-[focus]:outline-1 data-[focus]:outline-white"
								}
							>
								Ingredients
							</Tab>
							<Tab
								className={
									"rounded-md py-2 px-4 focus:outline-none data-[selected]:bg-secondary data-[hover]:bg-secondary/50 data-[selected]:data-[hover]:bg-secondary/10 data-[focus]:outline-1 data-[focus]:outline-white"
								}
							>
								Tools
							</Tab>
						</TabList>

						<TabPanels className={"p-6"}>
							<TabPanel
								className={
									"flex gap-4 flex-wrap text-foreground text-lg font-medium"
								}
							>
								{recipe?.ingredients.map((ingredient) => (
									<div key={ingredient.id}>
										<Image
											src={ingredient.ingredient.image}
											alt={ingredient.ingredient.name}
											width={100}
											height={100}
											className={
												"rounded-lg w-[100px] h-[100px] md:h-[150px] md:w-[150px] object-cover"
											}
										/>
										<h3
											className={
												"font-bold text-md md:text-xl text-center"
											}
										>
											{ingredient.ingredient.name}
										</h3>
										<p
											className={
												"text-sm md:text-md text-gray-400 text-center"
											}
										>
											{ingredient.quantity}{" "}
											{ingredient.unit_measure}
										</p>
									</div>
								))}
							</TabPanel>
							<TabPanel
								className={
									"grid grid-cols-2 md:flex md:items-center gap-4 md:flex-wrap text-foreground text-lg font-medium"
								}
							>
								{recipe?.tools.map((tool) => (
									<div
										key={tool.id}
										className="flex flex-col justify-center items-center md:block text-foreground text-lg font-medium"
									>
										<Image
											src={tool.tool.image}
											alt={tool.tool.name}
											width={100}
											height={100}
											className={
												"rounded-lg w-[100px] h-[100px] md:h-[150px] md:w-[150px] object-cover"
											}
										/>
										<h3
											className={
												"font-bold text-md md:text-xl text-center"
											}
										>
											{tool.tool.name}
										</h3>
									</div>
								))}
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
			<div className={"w-full my-4 recipe-detail-slider"}>
				<h2>
					<Waypoints /> Steps
					{recipe?.steps && ` (${recipe?.steps.length})`}
				</h2>
				<Swiper {...swiperParams}>
					{recipe?.steps &&
						recipe?.steps.map((step) => (
							<SwiperSlide
								key={step.id}
								className={`!flex flex-col items-center justify-center gap-4 rounded-md h-[400px] p-8`}
							>
								<h3
									className={
										"text-secondary font-bold text-2xl md:text-4xl"
									}
								>
									{step.stepNumber}
								</h3>
								<p
									className={
										"text-foreground text-lg leading-relaxed"
									}
								>
									{step.content}
								</p>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
			{recipe?.comments && (
				<div className="w-full flex flex-col gap-4 my-4">
					{recipe?.comments.length > 0 && (
						<div>
							<h2>
								<MessageSquareQuote /> Comments{" "}
								{recipe?.comments &&
									`(${recipe?.comments.length})`}
							</h2>
							<div className={"flex flex-col gap-2"}>
								{recipe?.comments.map((comment) => (
									<Comment
										comment={comment}
										key={comment.id}
									/>
								))}
							</div>
						</div>
					)}
					{/*TODO: Update for connected user */}
					{(user || isSignedIn) && (
						<div>
							<h2>
								<MessageSquareQuote /> Add a comment
							</h2>
							<form action="">
								<div className="flex gap-4">
									<textarea
										className="border border-slate-600/50 bg-header text-foreground focus:outline-none rounded-md w-full p-2"
										draggable={false}
										placeholder="Write your comment here..."
									/>
									<button className="text-foreground text-sm font-medium rounded-md bg-secondary px-4 py-2">
										Publish
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			)}
			<div>
				<h2>
					<Lightbulb /> Suggestions
				</h2>
				<div className="flex flex-col gap-4">
					{suggestions &&
						suggestions.map((suggestion) => (
							<RecipeCard
								key={suggestion.id}
								recipe={suggestion}
								detailed={true}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default RecipeDetail
