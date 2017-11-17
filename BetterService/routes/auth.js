const passport = require('passport');
const passportConfig = require('../helpers/passport');

const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeHelper');
const AuthController = require('../controllers/auth');


router.route('/register')
    .post(validateBody(schemas.authSchema), AuthController.signup);

router.route('/login')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', {session: false}), AuthController.signin);

router.route('/invalidate')
    .get(passport.authenticate('jwt', {session: false}), AuthController.invalidate);

router.route('/verify')
    .get(passport.authenticate('jwt', {session: false}), AuthController.verify);

module.exports = router;