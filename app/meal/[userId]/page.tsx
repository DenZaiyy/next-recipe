"use client"

import { useUser } from "@clerk/nextjs"

const MyMealPlanner = () => {
	const { user } = useUser()

	return (
		<div>
			<h1>My meal planner</h1>
			<p>{user?.id}</p>
			<p>{user?.username}</p>
		</div>
	)
}

export default MyMealPlanner
