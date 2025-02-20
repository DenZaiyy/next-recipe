import { redirect } from "next/navigation";

export const fetchSuggest = async (
  cateogryId: string,
  currentRecipeId: string,
): Promise<TRecipe[]> => {
  const res = await fetch(
    `/api/recipe/suggestions/${cateogryId}/${currentRecipeId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) redirect("/recipe");

  return res.json();
};
