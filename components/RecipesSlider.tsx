"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { RecipeCard } from "@/components/RecipeCard";

interface ISliderProps {
  recipes: TRecipe[];
}

export const RecipesSlider: React.FC<ISliderProps> = ({ recipes }) => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 50,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        spaceBetween={100}
        navigation={true}
        pagination={false}
      >
        {recipes.map((recipe: TRecipe) => (
          <SwiperSlide key={recipe.id}>
            {({ isActive }) => <RecipeCard recipe={recipe} active={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
