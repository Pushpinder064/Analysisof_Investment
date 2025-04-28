const express = require("express");
const LargeCap = require("../services/largeCap");
const calculateDynamicAllocation = require("../services/mutualFundAllocation");
const MutualFundData = require("../services/mutualFundData");
const GetMFDataSet = require("../services/getMFData");
const mutualFundRouter = express.Router();


mutualFundRouter.get("/api/v1/mutual-fund/best-large-cap", LargeCap)
mutualFundRouter.post("/api/v1/mutual-fund-investment-calculator", calculateDynamicAllocation)
mutualFundRouter.get("/api/v1/mf/info/data", MutualFundData)
mutualFundRouter.get("/api/v1/mf/data", GetMFDataSet)
module.exports = mutualFundRouter;