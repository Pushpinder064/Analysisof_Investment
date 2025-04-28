const express = require('express')
const serverHealth = require("../utils/serverHealth")
const router = express.Router();

// Check whether the databse is connected to the server oor not

router.get('/test', (serverHealth));

module.exports = router

