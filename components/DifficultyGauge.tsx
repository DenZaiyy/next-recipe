import React, { useEffect, useState } from "react"
import { Gauge } from "lucide-react"

interface IGaugeProps {
	difficulty: number
}

export const DifficultyGauge: React.FC<IGaugeProps> = ({ difficulty }) => {
	const [color, setColor] = useState("#fff")
	const theme = localStorage.getItem("theme")

	useEffect(() => {
		if (difficulty > 3) {
			setColor("#ff0000")
		} else if (difficulty > 2) {
			setColor("#ffa500")
		} else {
			setColor("#32cd32")
		}
	}, [difficulty])

	return Array.from({ length: 5 }).map((_, index) => (
		<Gauge
			key={index}
			size={24}
			color={
				index < difficulty ? color : theme == "dark" ? "#fff" : "#000"
			}
			strokeWidth={2}
		/>
	))
}
