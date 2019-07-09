# Movies app solution

REST API, a basic movie database interacting with external API (http://www.omdbapi.com/).

Solution for recruitment task

## How to build this app?

### Build it yourself and setup your own db

1. Setup database (postgreSQL)
2. Git clone this repo
3. Provide env variables in development.env file placed in root of this repo

#### Example development.env

```
API_KEY=xxxxxx
DB_HOST=localhost
DB_USERNAME=pg-username
DB_PASSWORD=pg-password
DB_DATABASE=pg-db
DB_PORT=5432
```

4. Run `npm run start` to launch this app (see other options in package.json)

### Or use launch app using hosted image on dockerhub:

https://hub.docker.com/r/walenpiotr/movie-solution
To launch app you can use docker-compose and following docker-compose.yml config

```
version: "3.1"
services:
  resource-db:
    image: postgres:latest
    restart: always
    env_file:
      - ./.env/db.env
    volumes:
      - ./.data/db:/var/lib/postgresql/data
  service:
    image: walenpiotr/movie-solution:1.0.1
    restart: always
    depends_on:
      - resource-db
    env_file:
      - ./.env/service.env
    ports:
      - 3000:3000

```

Make sure that you provide appropriate env files for containers placed in .env directory.

#### Example service.env

```
API_KEY=xxxxxx
DB_HOST=localhost
DB_USERNAME=pg-username
DB_PASSWORD=pg-password
DB_DATABASE=pg-db
DB_PORT=5432
```

#### Example db.env

POSTGRES_USER=pg-username
POSTGRES_PASSWORD=pg-password
POSTGRES_DB=pg-db

## Live demo

App was deployed using Docker and DigitalOcean servers
To view live demo of this app please visit http://46.101.246.218:3000/
To view interactive docs (swagger ui) of this app visit http://46.101.246.218:3000/api/
