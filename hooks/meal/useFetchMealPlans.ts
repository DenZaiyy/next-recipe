import { useEffect, useState } from "react"
import { apiMealService } from "@/services/mealService"
import { useUser } from "@clerk/nextjs"

export const useFetchMealPlans = () => {
	const { user } = useUser()

	const [mealPlans, setMealPlans] = useState<TMealPlan[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		// Fetch user meal plans
		const fetchMealPlans = async (userId: string) => {
			try {
				setIsLoading(true)
				const data = await apiMealService.getMealPlanByUser(userId)

				if (data) setMealPlans(data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		if (user) {
			fetchMealPlans(user.id)
		}
	}, [user])

	return { mealPlans, isLoading }
}
