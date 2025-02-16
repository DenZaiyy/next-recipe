import Image from "next/image";
import { ArrowRight, HeartPulse, Leaf } from "lucide-react";
import React from "react";
import Link from "next/link";
import {Category} from "@/components/Category";
import {DifficultyGauge} from "@/components/DifficultyGauge";
import {Duration} from "@/components/Duration";

interface IRecipeCardProps {
    recipe: TRecipe;
    detail?: boolean
}

export const RecipeCard: React.FC<IRecipeCardProps> = ({ recipe, detail }) => {
    const difficulty = recipe.difficulty;

    return (
        <div className="rounded-md overflow-hidden relative w-[300px] h-auto bg-header">
            {!detail && (
                <div className="absolute flex gap-2 top-2 right-2 rounded-full bg-white/50 p-2">
                    <Leaf
                        size={24}
                        color={"#000"}
                        strokeWidth={1}
                        fill={"#088500"}
                    />
                    <HeartPulse
                        size={24}
                        color={"#000"}
                        strokeWidth={1}
                        fill={"rgb(255,0,0)"}
                    />
                </div>
            )}
            <div className="overflow-hidden">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full aspect-auto"
                    width={detail ? 100 : 300}
                    height={detail ? 100 : 300}
                />
            </div>
            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-white text-2xl font-extrabold">
                    {recipe.title}
                </h2>
                {!detail && recipe.category && (
                    <div>
                        <Category category={recipe.category} />
                    </div>
                )}

                {!detail && (
                    <Duration duration={recipe.duration} size={18} />
                )}
                {!detail && (
                    <div className="flex gap-1"><DifficultyGauge difficulty={difficulty} /></div>
                )}
                <Link href={'/recipe/' + recipe.slug} className="rounded border border-white px-4 py-2 text-white font-medium flex gap-2 w-max duration-200">
                    View recipe <ArrowRight />
                </Link>
            </div>
        </div>
    );
};
