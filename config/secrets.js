const jwt = require('jsonwebtoken');

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'I like pineapple on pizza',

    generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.username,
            department: user.department
        }
        const options = {
            expiresIn: '1h'
        }
        return jwt.sign(payload, this.jwtSecret, options)
    }
}