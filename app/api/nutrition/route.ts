import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const ingredientsString = searchParams.get("ingredientsString")

	if (!ingredientsString) {
		return new NextResponse("Missing required fields", { status: 400 })
	}

	try {
		const response = await fetch(
			`https://api.edamam.com/api/nutrition-data?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&nutrition-type=cooking&ingr=${ingredientsString}`,
			{ method: "GET", headers: { "Content-Type": "application/json" } },
		)

		if (!response.ok) {
			console.log("NUTRITION RESPONSE ERROR", response)
			return new NextResponse("Internal Error", { status: 500 })
		}

		const data = await response.json()

		//console.log("NUTRITION RESPONSE", response)

		return NextResponse.json(data)
	} catch (err) {
		console.log("[NUTRITION] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
