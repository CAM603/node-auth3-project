const express = require('express');

const router = express.Router();

const Users = require('./users-model');

router.get('/', checkRole('service'), (req, res) => {
    Users.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})
function checkRole(department) {
    return (req, res, next) => {
        
        if(
            req.decodedToken && 
            req.decodedToken.department && 
            req.decodedToken.department.toLowerCase() === department
            ) {
            next()
        } else {
            res.status(403).json({message: 'IDK who you are'})
        }
    }
}
module.exports = router;