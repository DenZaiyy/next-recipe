import {db} from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const recipes = await db.recipe.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                },
                tools: {
                    include: {
                        tool: true
                    }
                },
                categories: {
                    include: {
                        category: true
                    }
                },
            }
        })

        return NextResponse.json(recipes);
    } catch (err) {
        console.error('[RECIPES] ', err)
        return new NextResponse('Internal Error', {status: 500})
    }
}