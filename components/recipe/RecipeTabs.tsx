import { CookingPot } from "lucide-react"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { RecipeTabsItemsCard } from "@/components/recipe/RecipeTabsItemsCard"

interface RecipeTabsProps {
	ingredients: TIngredientRecipe[]
	tools: TToolRecipe[]
}

export const RecipeTabs = ({ ingredients, tools }: RecipeTabsProps) => {
	return (
		<div className="md:w-1/2 h-full">
			<h2>
				<CookingPot /> Ingredients and Tools
			</h2>
			<TabGroup className="border border-slate-600/50 rounded-md">
				<TabList className="flex p-2 bg-header font-bold rounded-md duration-300">
					<Tab className="rounded-md py-2 px-4 focus:outline-none data-[selected]:bg-secondary data-[hover]:bg-secondary/50 data-[selected]:data-[hover]:bg-secondary/10 data-[focus]:outline-1 data-[focus]:outline-white">
						Ingredients
					</Tab>
					<Tab className="rounded-md py-2 px-4 focus:outline-none data-[selected]:bg-secondary data-[hover]:bg-secondary/50 data-[selected]:data-[hover]:bg-secondary/10 data-[focus]:outline-1 data-[focus]:outline-white">
						Tools
					</Tab>
				</TabList>

				<TabPanels className="p-6">
					<TabPanel className="flex gap-4 flex-wrap text-foreground text-lg font-medium">
						{ingredients.map((ingredientRecipe) => (
							<RecipeTabsItemsCard
								key={ingredientRecipe.id}
								ingredientRecipe={ingredientRecipe}
							/>
						))}
					</TabPanel>
					<TabPanel className="grid grid-cols-2 md:flex md:items-center gap-4 md:flex-wrap text-foreground text-lg font-medium">
						{tools.map((toolRecipe) => (
							<RecipeTabsItemsCard
								key={toolRecipe.id}
								toolRecipe={toolRecipe}
							/>
						))}
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	)
}
