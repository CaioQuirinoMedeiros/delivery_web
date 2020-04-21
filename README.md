# Pizza Delivery - Web

<img src="/public/pizza-delivery-thumb.png">

## About

This project is part of the final challenge of [Rocketseat bootcamp course](https://rocketseat.com.br/bootcamp). It consists in a delivery application of a fantasy pizza parlor.

## Integration

This web app integrates with an [API](https://github.com/CaioQuirinoMedeiros/delivery_api) built with NodeJS and it's designed to manage the application. There's a [mobile app](https://github.com/CaioQuirinoMedeiros/delivery_app) intended for customers

## Try it now

I deployed this project on Netlify, try it out: [pizza-delivery.com](https://pizza-delivery.netlify.com)

- email: `admin@delivery.com`
- password: `123456`

**Note**
Remember that this web app is for managing the application, try the [app for customers](https://github.com/CaioQuirinoMedeiros/delivery_app) too

## :arrow_down: Installing

**Cloning the repo**

```shell
git clone https://github.com/CaioQuirinoMedeiros/delivery_web.git

cd delivery_web
```

**Installing dependencies**

```shell
yarn install
```

## :satellite: Connecting with the server API

1. Follow the instructions on [delivery-api](https://github.com/CaioQuirinoMedeiros/delivery_api) to have the server up and running
2. Create a _.env_ file and set a variable `REACT_APP_API_URL` with the value of your server url

- It should looks like this: `CREATE_APP_API_URL=http://127.0.0.1:3333`

## :runner: Running
run in development mode
```shell
yarn start
```
or you can build and then serve the build folder
```shell
yarn build
```
