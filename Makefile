VERSION=1.0.0

build:
	docker build . -t next-recipe:${VERSION} -t next-recipe:latest

run:
	docker run -d -p 3000:3000 --name next-recipe --env-file .env next-recipe

logs:
	docker logs -f next-recipe

restart:
	docker restart next-recipe

dev:
	docker-compose -f docker-compose.dev.yml up --build