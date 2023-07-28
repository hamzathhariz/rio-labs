var express = require('express');
var router = express.Router();
var authRepository = require('../../repositories/profile/auth');

router.post('/signup', (req, res, next) => {
    authRepository.userSignup(req, res, next);
});

module.exports = router;