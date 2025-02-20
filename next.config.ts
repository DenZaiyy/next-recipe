import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "via.placeholder.com0" },
			{ protocol: "https", hostname: "img.spoonacular.com" },
			{ protocol: "https", hostname: "spoonacular.com" },
		],
	},
}

export default nextConfig
