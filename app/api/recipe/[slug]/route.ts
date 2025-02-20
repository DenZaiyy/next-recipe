import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface TRecipeProps {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: TRecipeProps) {
  const { slug } = await params;

  try {
    const recipe = await db.recipe.findUnique({
      where: {
        slug: slug,
      },
      include: {
        category: true,
        tools: {
          include: {
            tool: true,
          },
        },
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
        steps: {
          orderBy: {
            stepNumber: "asc",
          },
        },
      },
    });

    //console.log('[RECIPE DETAIL] ', recipe);
    return NextResponse.json(recipe);
  } catch (err) {
    console.log("[RECIPE DETAIL] ", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
