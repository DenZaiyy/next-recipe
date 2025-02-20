import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recipes =
      (await db.recipe.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      })) || [];

    return NextResponse.json(recipes);
  } catch (err) {
    console.log("[RECIPES] ", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
