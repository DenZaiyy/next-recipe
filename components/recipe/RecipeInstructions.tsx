import { ListChecks } from "lucide-react"

interface RecipeInstructionsProps {
	instructions: string
}

export const RecipeInstructions = ({
	instructions,
}: RecipeInstructionsProps) => {
	return (
		<div className="md:w-1/2">
			<h2 className="flex items-center gap-2 mb-4">
				<ListChecks className="text-secondary" />
				<span>Instructions</span>
			</h2>
			<div className="space-y-4">
				{instructions.split("\n").map((paragraph, index) => (
					<p
						key={index}
						className="font-medium text-foreground text-lg leading-relaxed text-justify"
					>
						{paragraph}
					</p>
				))}
			</div>
		</div>
	)
}
