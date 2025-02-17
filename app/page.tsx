"use client";

import {useUser} from "@clerk/nextjs";

export default function Home() {

    const {user} = useUser()
    console.log(user)

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-4 text-foreground font-bold">MyRecipes</h1>
            <p>NextJS website to learn more about NextJS</p>
            <div className={"mt-5"}>
                <h2 className="text-2xl mb-4 text-foreground font-bold">
                    Functionalities
                </h2>
                <ul className={"list-disc list-inside ml-4"}>
                    <li>Authentication</li>
                    <li>Theme Switcher</li>
                    <li>Blog</li>
                    <li>Comments</li>
                    <li>CRUD</li>
                </ul>
            </div>
            <div className={"mt-5"}>
                <h2 className="text-2xl mb-4 text-foreground font-bold">
                    Dependencies
                </h2>
                <ul className={"list-disc list-inside ml-4"}>
                    <li>NextJS</li>
                    <li>Typescript</li>
                    <li>TailwindCSS</li>
                    <li>React Hot Toast</li>
                    <li>Prisma</li>
                    <li>Luicide Icons</li>
                    <li>React Swiper</li>
                    <li>Clerk</li>
                    <li>Headless UI</li>
                    <li>Date Fns</li>
                    <li>Zod</li>
                </ul>
            </div>
        </div>
    );
}
