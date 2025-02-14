import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton} from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-8 px-12 bg-header">
            <Link href="/" className="font-bold text-3xl text-secondary">MyRecipes</Link>
            <ul className="flex gap-6">
                <Link href="/recipe" className="text-white dark:text-foreground hover:text-secondary duration-200 active:text-secondary text-xl font-medium">Recipes</Link>
                <Link href="#" className="text-foreground hover:text-secondary duration-200 text-xl font-medium">Search</Link>
                <Link href="#" className="text-foreground hover:text-secondary duration-200 text-xl font-medium">Blog</Link>
                {/*<SignedIn>
                    <UserButton />
                    <SignOutButton />
                </SignedIn>
                <SignedOut>
                    <Link href='/sign-in' className="text-foreground hover:text-secondary duration-200 text-xl font-medium">Se connecter</Link>
                    <Link href='/sign-up' className="text-foreground hover:text-secondary duration-200 text-xl font-medium">S'inscrire</Link>
                </SignedOut>*/}
            </ul>
        </nav>
    )
}