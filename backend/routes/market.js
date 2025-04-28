const express = require('express');
const TopGainer = require('../services/topGainers');
const TopLosers = require('../services/topLosers');
const marketRouter = express.Router();
TopGainer

marketRouter.get("/api/v1/market/top_gainers", TopGainer)
marketRouter.get("/api/v1/market/top_losers", TopLosers)

module.exports = marketRouter