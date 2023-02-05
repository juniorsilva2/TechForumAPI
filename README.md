# TechForum

This is the final project of Web Programming Class I

A discussion forum template that i am using to learn about authentication and relationships between entities.

## Local Installation

First you will need to install a few Requirements, i recommend using NPM for Node and Docker for database's.

#### Requirements:

- [NPM](https://github.com/nvm-sh/nvm)
- [Docker](https://docs.docker.com/engine/install/)
- [MongoDB](https://hub.docker.com/_/mongo)

Then you can Run the following command to install the remaining dependencies.

```bash
  npm i
```

## Deploy

To deploy this project run:

```bash
  npm run start_dev
```

## Environment Variables

```bash
  # Express API   
  EXPRESS_HOST = localhost
  EXPRESS_PORT = 3003

  # MongoDB Local
  MONGO_HOST = localhost
  MONGO_PORT = 27017
  MONGO_DB = TechForum

  #Bcrypt API
  BCRYPT_SECRET = 8

  #JSON Web Token
  JWT_SECRET = IOASHD123sdfEIOHWI4RJ12JK4ioqskdio

  #Profile Pic save format
  PROFILE_PIC_FORMAT = .jpeg
```

## Authors

- [Junior Silva](https://www.github.com/juniorsilva2)
