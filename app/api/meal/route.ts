import { NextResponse } from "next/server"
import { z } from "zod"

export async function POST(req: Request) {
	const formData = await req.formData()
	const zString = z.string()
	const zDate = z.string().date()
	const zStringArr = z.array(z.string())

	// TODO: complete validation of form and error handling if needed

	const userId = zString.parse(formData.get("userId"))
	const date = zDate.parse(formData.get("date"))
	const breakfastRecipes = zStringArr.parse(
		formData.getAll("recipes-breakfast"),
	)
	const lunchRecipes = zStringArr.parse(formData.getAll("recipes-lunch"))

	const dinnerRecipes = zStringArr.parse(formData.getAll("recipes-dinner"))

	if (!userId || !date) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		)
	}

	/*try {
        const breakfastRecipes = await db.recipe.findMany({ where: { slug } })

        return NextResponse.json(
            { comment, redirect: `/meal/user/${userId}` },
            { status: 201 },
        )
    } catch (err) {
        console.error("[MEALPLAN_CREATE] ", err)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        )
    }*/
}
