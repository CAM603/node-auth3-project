const express = require('express');

const router = express.Router();

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

module.exports = router;