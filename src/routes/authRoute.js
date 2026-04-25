const express = require("express");
const router = express.Router();

const {registerUser} = require('./controller/auth-controller.js');

router.post('/register', registerUser);

module.exports = router;