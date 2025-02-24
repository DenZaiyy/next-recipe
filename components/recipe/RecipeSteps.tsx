import { Waypoints } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Scrollbar } from "swiper/modules"
import { SwiperOptions } from "swiper/types"
import "swiper/css"
import "swiper/css/bundle"

interface RecipeStepsProps {
	steps: TStep[]
}

const swiperParams: SwiperOptions = {
	modules: [Pagination, Scrollbar],
	spaceBetween: 10,
	slidesPerView: 2,
	pagination: { clickable: true },
	effect: "creative",
	creativeEffect: {
		prev: { translate: [0, 0, -400] },
		next: { translate: ["100%", 0, 0] },
	},
	grabCursor: true,
	watchSlidesProgress: true,
	watchOverflow: false,
}

export const RecipeSteps = ({ steps }: RecipeStepsProps) => {
	if (!steps || steps.length === 0) return null

	return (
		<div className="w-full my-4 recipe-detail-slider">
			<h2>
				<Waypoints /> Steps ({steps.length})
			</h2>
			<Swiper {...swiperParams}>
				{steps.map((step) => (
					<SwiperSlide
						key={step.id}
						className="!flex flex-col items-center justify-center gap-4 rounded-md h-[400px] p-8"
					>
						<h3 className="text-secondary font-bold text-2xl md:text-4xl">
							{step.stepNumber}
						</h3>
						<p className="text-foreground text-lg leading-relaxed">
							{step.content}
						</p>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
