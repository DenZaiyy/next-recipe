import {
	Apple,
	Candy,
	Citrus,
	Droplet,
	Drumstick,
	Leaf,
	Wheat,
} from "lucide-react"
import { useEffect, useState } from "react"
import { NutritionalCard } from "@/components/NutritionalCard"
import { Chart } from "@/components/chart/Chart"

interface RecipeNutritionalInfosProps {
	ingredients: TIngredientRecipe[]
}

interface TNutritionInfo {
	label: string
	quantity: number
	unit: string
}

interface TChartProps {
	labels: string[]
	values: number[]
}

export const RecipeNutritionalInfos = ({
	ingredients,
}: RecipeNutritionalInfosProps) => {
	const [calories, setCalories] = useState<TNutritionInfo>()
	const [protein, setProtein] = useState<TNutritionInfo>()
	const [carbohydrate, setCarbohydrate] = useState<TNutritionInfo>()
	const [lipid, setLipid] = useState<TNutritionInfo>()
	const [sugars, setSugars] = useState<TNutritionInfo>()
	const [vitC, setVitC] = useState<TNutritionInfo>()
	const [datas, setDatas] = useState<TChartProps>()

	const ingredientsList = ingredients
		.map(
			(ingredient) =>
				`${ingredient.quantity} ${ingredient.unit_measure} ${ingredient.ingredient.name}`,
		)
		.join(",")

	const ingredientsString = encodeURIComponent(ingredientsList)

	useEffect(() => {
		const fetchNutritionInfo = async (ingredientsString: string) => {
			const nutritionInfo = await fetch(
				`/api/nutrition?ingredientsString=${encodeURIComponent(ingredientsString)}`,
			)
				.then((res) => res.json())
				.then((data) => data.ingredients[0].parsed[0].nutrients)

			setCalories(nutritionInfo["ENERC_KCAL"])
			setProtein(nutritionInfo["PROCNT"])
			setCarbohydrate(nutritionInfo["CHOCDF"])
			setLipid(nutritionInfo["FAT"])
			setSugars(nutritionInfo["SUGAR"])
			setVitC(nutritionInfo["VITC"])

			/*const labels = Object.keys(nutritionInfo).map((key) => key)
            const values = Object.values(nutritionInfo).map(
                (value) => value.quantity,
            )*/
		}

		const labels = [
			"Calories",
			"Protein",
			"Carbohydrate",
			"Lipid",
			"Sugars",
			"Vitamin C",
		]
		const values = [1.4, 3.4, 1, 0.4, 0.6, 0.8]

		setDatas({ labels, values })

		fetchNutritionInfo(ingredientsString)
	}, [ingredients])

	return (
		<div className="w-full">
			<h2 className="flex items-center gap-2 mb-4">
				<Leaf className="text-secondary" />
				<span className="capitalize">Nutritional Infos</span>
			</h2>
			<div className="bg-header p-2 rounded-md grid md:grid-cols-2 lg:grid-cols-3 gap-2">
				<NutritionalCard
					icon={Apple}
					title="Calories"
					value={
						calories
							? `${calories.quantity} ${calories.unit}`
							: "N/A"
					}
					bgColor="bg-green-100 dark:bg-green-900"
					iconColor="text-green-600 dark:text-green-300"
				/>
				<NutritionalCard
					icon={Drumstick}
					title="Protein"
					value={
						protein ? `${protein.quantity} ${protein.unit}` : "N/A"
					}
					bgColor="bg-blue-100 dark:bg-blue-900"
					iconColor="text-blue-600 dark:text-blue-300"
				/>
				<NutritionalCard
					icon={Wheat}
					title="Carbohydrate, by difference"
					value={
						carbohydrate
							? `${carbohydrate.quantity} ${carbohydrate.unit}`
							: "N/A"
					}
					bgColor="bg-yellow-100 dark:bg-yellow-900"
					iconColor="text-yellow-600 dark:text-yellow-300"
				/>
				<NutritionalCard
					icon={Droplet}
					title="Total lipid (fat)"
					value={lipid ? `${lipid.quantity} ${lipid.unit}` : "N/A"}
					bgColor="bg-red-100 dark:bg-red-900"
					iconColor="text-red-600 dark:text-red-300"
				/>
				<NutritionalCard
					icon={Candy}
					title="Sugars, total including NLEA"
					value={sugars ? `${sugars.quantity} ${sugars.unit}` : "N/A"}
					bgColor="bg-pink-100 dark:bg-pink-900"
					iconColor="text-pink-600 dark:text-pink-300"
				/>
				<NutritionalCard
					icon={Citrus}
					title="Vitamin C, total ascorbic acid"
					value={vitC ? `${vitC.quantity} ${vitC.unit}` : "N/A"}
					bgColor="bg-orange-100 dark:bg-orange-900"
					iconColor="text-orange-600 dark:text-orange-300"
				/>
				{datas && (
					<div>
						<Chart chartData={datas} />
					</div>
				)}
			</div>
		</div>
	)
}
