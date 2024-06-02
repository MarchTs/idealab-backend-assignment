# idealab-backend-assignment

## Migration
- Run `docker-compose up -d db` to start the database
- Copy `.env.local` to `.env` and fill in the values
- Run `knex migrate:latest` to run the migrations
- Run `knex seed:run` to seed the database

## TODO Before Starting Docker
- Run `docker-compose up -d --build app` to start the app

## TODO Start app local
- Run `yard install` to install all dependencies
- Run `yarn dev` to start the app

## Setup bruno
- install bruno from https://www.usebruno.com/downloads
- Open bruno collection from `/bruno` folder
- Change environment to be Localhost