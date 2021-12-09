# certificate-site-front
Combination of Vue3 and Firebase. The backend is handled by Firebase SDK and APIs from firebase functions

## .env file setup
```
VUE_APP_APIKEY = :D
VUE_APP_AUTHDOMAIN = :D
VUE_APP_PROJECTID = :D
VUE_APP_STORAGEBUCKET = :D
VUE_APP_MESSAGINGSENDERID = :D
VUE_APP_APPID = :D
VUE_APP_MEASUREMENTID = :D
VUE_APP_ALCHEMY_API = https://eth-rinkeby.alchemyapi.io/v2/XRPvFg0y_AkvSkUCsWrdWLQa8hDXPE8K
VUE_APP_CM_ADDRESS = 0xBD358a4869c7b1E42794615bd72EE093b7369Abc
```

## Project setup
```
yarn install
```

Also, hosting settings on firebase is recommended as followed
```
{
  "hosting": {
    "public": "dist",
    "site": "your-site",
    "rewrites": [
      { "source": "/api/**", "function": "app" },
      {
        "source": "/**",
        "destination": "/index.html"
      }
    ],

    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Deploy
```
yarn deploy
```

### stop deploying
```
yarn stop
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).