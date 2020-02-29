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
- config
    * `secrets.js`

## Inside .env
- Add `PORT=5000`
- Make sure to add .env to .gitignore to prevent it from being uploaded to GitHub
    * `npx gitignore node` will have included .env in the gitignore

## Inside index.js
- Add `require('dotenv').config();` at the very top
    * **It's recommended to load configuration for .env as early as possible**
- Add `const server = require('./api/server.js');`
- Add `const PORT = process.env.PORT || 5000;`
- Add `server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));`

## Initialize knex
- `knex init`

## Edit knexfile.js
**BEFORE**
```js
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
}
```
**AFTER**
```js
module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
          filename: './data/users.db3'
        },
        useNullAsDefault: true,
        migrations: {
          directory: './data/migrations'
        },
        seeds: {
          directory: './data/seeds'
        },
        pool: {
          afterCreate: (conn, done) => {
            // runs after a connection is made to the sqlite engine
            conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
          },
        },
      },
}
```
**Notes**
- The `development.connection.filename` will create and name the database and the path should start at root of the repo, not the configuration file itself
- The `development.pool` is needed when using foreign keys

## Inside users-router.js
- Add `const express = require('express');`
- Add `const Users = require('./users-model');`
- Add `const router = express.Router();`
- Add `module.exports = router;`

## Inside dbConfig.js
- Add `const knex = require('knex');`
- Add `const configOptions = require('../knexfile').development;`
- Add `module.exports = knex(configOptions);`

## Inside users-model.js
- Add `const db = require('../data/dbConfig');`
- Add `module.exports = {}`

## Inside server.js
- Add `const express = require('express');`
- Add `const apiRouter = require('./api-router.js');`
- Add `const configureMiddleware = require('./configure-middleware.js');`
- Add `const server = express();`
- Add `configureMiddleware(server);`
- Add `server.use('/api', apiRouter);`
- Add (optional) `server.get('/', (req, res) => res.send('<h1>Hello from Node auth1 Project</h1>'));`
- Add `module.exports = server;`

## Inside configure-middleware.js
- Add:
```js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
```

## Inside api-router.js
- Add `const router = require('express').Router();`
- Add `const authRouter = require('../auth/auth-router.js');`
- Add `const usersRouter = require('../users/users-router.js');`
- Add `const restrcited = require('../auth/restricted-middleware');`
- Add `router.use('/auth', authRouter);`
- Add `router.use('/users', restrcited, usersRouter);`
- Add `module.exports = router;`

## Inside auth-router.js
- Add `const bcrypt = require('bcryptjs');`
- Add `const router = require('express').Router();`
- Add `const Users = require('../users/users-model.js');`
- Add `module.exports = router;`
- Add `const jwt = require('jsonwebtoken');`
- Add `const secrets = require('../config/secrets');`

## Inside .env
- Add JWT_SECRET=I like pineapple on pizza

## Inside secrets.js
- Add:
```js
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'I like pineapple on pizza'
}
```

## Create a migration
- `knex migrate:make create_users_table`

## Inside new migration file
- Create a table however you please
- Add migration `knex migrate:latest`

## Prepare for adding seeds
- Run `npm install knex-cleaner`
- Run `knex seed:make 00-cleanup`
- Inside the cleanup seed add
```js
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    // resets ids
    mode: 'truncate',
    // don't empty migration tables
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], 
  });
};
```
- This removes all tables (excluding the two tables that track migrations) in the correct order before any seed files run.

## Make seeds
- **Important** create seeds *in the same order you created your tables* 
    * In other words, don’t create a seed with a foreign key, until that reference record exists
**Example Seeds**
- `knex seed:make 01-users`
- `knex seed:make 02-profile`

## Inside each seed
- Change all `table_name`'s to the name of the table
- Remove the following code block:
```js
  return knex('profile').del()
    .then(function () {
    });
```
- Seeds should now look like:
```js
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('profile').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
};
```
- Add data to your seeds accordingly
- Run `knex seed:run` when done

## Inside users-model.js
- Add functions for
    * get
    * getBy
    * getById
    * add

## Inside users-router
- Add get request

## Inside auth-router.js
- Add enpoints for login and logout
- Add generateToken(user)
    * Move to `secrets.js`

## Inside restricted-middleware.js
- Add `module.exports = (req, res, next) => etc`
- See `restricted-middleware.js` for details
