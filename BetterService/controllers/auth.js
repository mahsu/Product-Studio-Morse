const JWT = require('jsonwebtoken');
const User = require('../models/User');
const {JWT_SECRET} = require('../config/index');
const crypto = require('crypto');

signToken = ((user) => {
    return JWT.sign({
        iss: 'ApiAuth',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET)
});

async function newuid() {
    try {
        let buf = await crypto.randomBytes(32);
        return buf.toString('hex');
    }
    catch (error) {
        return res.status(500);
    }
}

module.exports = {

    signup: async (req, res, next) => {
        console.log('UsersController.signup() called');

        const {email, password} = req.value.body;

        const foundUser = await User.findOne({email});
        if (foundUser) {
            return res.status(403).json({error: 'Email is already in use'})
        }
        const newUser = new User({email, password});

        newUser.uid = await newuid();
        await newUser.save();

        const token = signToken(newUser);

        res.status(200).json({token, uid: newUser.uid})
    },

    signin: async (req, res, next) => {

        const token = signToken(req.user);
        res.status(200).json({token})
    },

    invalidate: async (req, res, next) => {
        req.user.uid = await newuid();
        await req.user.save();
        res.status(200).json({uid: req.user.uid});
    }
};