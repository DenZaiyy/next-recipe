import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

interface TRecipeProps {
    params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: TRecipeProps) {
    const { slug } = await params;

    try {
        const recipe = await db.recipe.findUnique({
            where: {
                slug: slug
            },
                include: {
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                    tools: {
                        include: {
                            tool: true,
                        },
                    },
                    ingredients: true,
                    comments: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                },
            });

        console.log('[RECIPE DETAIL] ', recipe);
        return NextResponse.json(recipe);
    } catch (err) {
        console.log("[RECIPE DETAIL] ", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
