"use client";

import React from "react";
import {RecipeCard} from "@/components/RecipeCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import {EffectCoverflow, Pagination} from "swiper/modules";

interface ISliderProps {
    recipes: TRecipe[]
}

export const Slider:React.FC<ISliderProps> = ({ recipes }) => {
    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                spaceBetween={10}
            >
                {recipes.map((recipe: TRecipe) => <SwiperSlide key={recipe.id}><RecipeCard recipe={recipe}/></SwiperSlide>)}
            </Swiper>
        </>
    )
}