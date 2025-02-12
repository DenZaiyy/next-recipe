import { PrismaClient } from '@prisma/client';
import {base, en, Faker, fr} from '@faker-js/faker';

const prisma = new PrismaClient();

export const customFaker = new Faker({
    locale: [fr, en, base],
});

async function main() {
    console.log('Seeding database...');

    for (let i = 0; i < 10; i++) {
        await prisma.tag.create({
            data: {
                name: customFaker.company.name(),
            },
        });
    }

    for (let i = 0; i < 10; i++) {
        await prisma.recipe.create({
            data: {
                title: customFaker.company.name(),
                image: customFaker.image.avatarLegacy(),
                instructions: customFaker.lorem.paragraph(),
                duration: customFaker.number.int({max: 240}),
                slug: customFaker.helpers.slugify(customFaker.company.name()),
            }
        })
    }

    for (let i = 0; i < 20; i++) {
        await prisma.ingredient.create({
            data: {
                name: customFaker.food.adjective(),
                unit_measure: "g"
            }
        })
    }

    for (let i = 0; i < 10; i++) {
        await prisma.category.create({
            data: {
                name: customFaker.animal.cat()
            }
        })
    }

    for (let i = 0; i < 10; i++) {
        await prisma.tool.create({
            data: {
                name: customFaker.animal.dog(),
                recipes: {}
            }
        })
    }

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
