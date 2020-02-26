## Add gitignore
- `npx gitignore node`

## Add package.json
- `npm init -y`

## Install nodemon as a development time dependency
- `npm i nodemon -D`

## Install additional dependencies
- `npm install knex sqlite3`
- `npm install express`
- `npm install -g knex`
- `npm i bcryptjs`
- `npm i cors`
- `npm i helmet`
- `npm install jsonwebtoken`
- `npm i dotenv`

## Change package.json
- Delete `"test": "echo \"Error: no test specified\" && exit 1"`
- Add `"server": "nodemon index.js"`

## Add a “start” script in package.json
- Start script uses node instead of nodemon to run index.js so we can deploy the API later
- Inside the scripts object add `"start": "node index.js"`

## Create root files
- .env
- index.js

## Create folders with files
- api
    * `api-router.js`
    * `configure-middleware.js`
    * `server.js`
- auth
    * `auth-router.js`
    * `restricted-middleware.js`
- data
    * `dbConfig.js`
- users
    * `users-model.js`
    * `users-router.js`

## Inside .env
- Add `PORT=5000`
- Make sure to add .env to .gitignore to prevent it from being uploaded to GitHub
    * `npx gitignore node` will have included .env in the gitignore
