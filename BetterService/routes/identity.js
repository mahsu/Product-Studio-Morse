const passport = require('passport');
const passportConfig = require('../helpers/passport');
const User = require('../models/User');

const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeHelper');
const IdentityController = require('../controllers/identity');


router.route('/new')
    .get(passport.authenticate('jwt', {session: false}), IdentityController.newDocument);

router.route('/verify')
    .get(passport.authenticate('jwt', {session: false}), IdentityController.verifyDocument);


module.exports = router;