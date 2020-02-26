const express = require('express');

const Users = require('./users-model');

router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

const router = express.Router();

module.exports = router;