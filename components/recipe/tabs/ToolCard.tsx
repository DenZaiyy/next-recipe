import Image from "next/image"

interface ToolCardProps {
	toolRecipe: TToolRecipe
}

export const ToolCard = ({ toolRecipe }: ToolCardProps) => {
	return (
		<div className="flex flex-col justify-center items-center md:block text-foreground text-lg font-medium">
			<Image
				src={toolRecipe.tool.image}
				alt={toolRecipe.tool.name}
				width={100}
				height={100}
				className="rounded-lg w-[100px] h-[100px] md:h-[150px] md:w-[150px] object-fill"
			/>
			<h3 className="font-bold text-md md:text-xl text-center">
				{toolRecipe.tool.name}
			</h3>
		</div>
	)
}
