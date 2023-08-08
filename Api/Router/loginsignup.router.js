const { CreateAccount } = require('../Controller/Login-Signup/signup.controller')
const { Login } = require('../Controller/Login-Signup/login.controller')
const router = require('express').Router();

router.post('/Signup',CreateAccount);
router.post('/Login',Login);

module.exports = router;
