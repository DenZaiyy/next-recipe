import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-8 px-12 bg-header">
            <Link href="/" className="font-bold text-3xl text-secondary">MyRecipes</Link>
            <ul className="flex gap-6">
                <Link href="/recipe" className="text-white text-xl font-medium">Recipes</Link>
                <Link href="#" className="text-white text-xl font-medium">Search</Link>
                <Link href="#" className="text-white text-xl font-medium">Blog</Link>
            </ul>
        </nav>
    )
}