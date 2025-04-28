const express = require('express')
const SearchResult = require('../services/search')
const searchRouter = express.Router()

searchRouter.get('/api/v1/search', SearchResult)

module.exports = searchRouter;