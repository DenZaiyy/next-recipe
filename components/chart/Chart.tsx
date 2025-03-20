"use client"

import React from "react"
import {
	ArcElement,
	Chart as ChartJS,
	Legend,
	Tooltip,
	TooltipItem,
} from "chart.js"
import { Pie } from "react-chartjs-2" // Enregistrer les composants nécessaires pour un graphique Pie

// Enregistrer les composants nécessaires pour un graphique Pie
ChartJS.register(ArcElement, Tooltip, Legend)

interface ChartDataProps {
	labels: string[]
	values: number[]
}

export const Chart: React.FC<{ chartData: ChartDataProps }> = ({
	chartData,
}) => {
	// Calcul du total pour les pourcentages
	const total = chartData.values.reduce((sum, value) => sum + value, 0)

	// Configuration du graphique
	const options = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: { position: "top" as const },
			title: { display: true, text: "Nutritional Information" },
			tooltip: {
				enable: true,
				callbacks: {
					label: function (context: TooltipItem<"pie">) {
						const label = context.label || ""
						const value = (context.raw as number) || 0
						const percentage = Math.round((value / total) * 100)
						return `${label}: ${value} (${percentage}%)`
					},
				},
			},
		},
	}

	// Données pour le graphique
	const data = {
		labels: chartData.labels,
		datasets: [
			{
				data: chartData.values,
				backgroundColor: [
					"rgba(255, 99, 132, 0.7)",
					"rgba(54, 162, 235, 0.7)",
					"rgba(255, 206, 86, 0.7)",
					"rgba(75, 192, 192, 0.7)",
					"rgba(153, 102, 255, 0.7)",
					"rgba(255, 159, 64, 0.7)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 2,
			},
		],
	}

	return <Pie options={options} data={data} />
}
