import { useEffect, useState } from "react"
import { apiMealService } from "@/services/mealService"

export const useFetchCategories = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categories, setCategories] = useState<TCategory[]>([])

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true)
			try {
				const data = await apiMealService.getCategories()

				if (data) setCategories(data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return { categories, isLoading }
}
