<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

## Description

Parking lot API

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn run start:prod
```

## Run with docker compose

```bash
# build & start (-d run on background)
docker-compose up -d

# stop
docker-compose down

# stop and remove image (Be careful option 'all' is remove all image any service)
docker-compose down --rmi all

```

### EndPoint

- Development (On Docker machine)
  - http://localhost:3000/parking-lot-api/swagger
- Localhost machine
  - http://localhost:5000/parking-lot-api/swagger
