const express = require('express');

const router = express.Router();

const Users = require('./users-model');

router.get('/', checkRole('service', 'it', 'sales', 'supplies'), (req, res) => {
    let department = req.decodedToken.department
    
    Users.getBy({department})
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/all', (req, res) => {
    
    Users.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

function checkRole(...departments) {
    return (req, res, next) => {
        
        if(
            req.decodedToken && 
            req.decodedToken.department && 
            departments.includes(req.decodedToken.department.toLowerCase())
        ) {
            next()
        } else {
            res.status(403).json({message: 'IDK who you are'})
        }
    }
}
module.exports = router;