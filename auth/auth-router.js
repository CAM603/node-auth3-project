const router = require('express').Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.getBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = secrets.generateToken(user);

                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

// function generateToken(user) {
//     const payload = {
//         subject: user.id,
//         username: user.username,
//         department: user.department
//     }
//     const options = {
//         expiresIn: '1h'
//     }
//     return jwt.sign(payload, secrets.jwtSecret, options)
// }

module.exports = router;