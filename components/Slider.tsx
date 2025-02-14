"use client";

import React from "react";
import {RecipeCard} from "@/components/RecipeCard";
import { Swiper, SwiperSlide } from 'swiper/react';

interface ISliderProps {
    recipes: TRecipe[]
}

export const Slider:React.FC<ISliderProps> = ({ recipes }) => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {recipes.map((recipe: TRecipe) => <SwiperSlide key={recipe.id}><RecipeCard recipe={recipe}/></SwiperSlide>)}
            </Swiper>
        </>
    )
}