# Project skeleton ([demo](https://to-do-f3bae.firebaseapp.com/))
#### with Firebase, Gulp, RequireJS, Underscore

## How to build project (production and development version) in one step

```
gulp prod:build      # production version

gulp dev:build       # development version
```

## Details

:one: Clone this repository: `git clone [this repository]`

:two: Move to the project root: `cd [into cloned project]`

:three: Install dependencies: `npm install`

:exclamation: Please, update config for your Firebase project in `app/js/init.js` file

:grey_exclamation: Be sure that you have installed Gulp and Firebase globally:

```
npm install -g gulp 

npm install -g firebase-tools
```

:four: Build production version: `gulp prod:build`

:five: Initialize and associate with Firebase project: `firebase init`

:six: Run local server and verify: `firebase serve`

:seven: Deploy to your Firebase hosting: `firebase deploy`
