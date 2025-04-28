const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./routes/test")
const searchRouter = require("./routes/searchResult")
const userRouter = require("./routes/user")
const marketRouter = require("./routes/market")
const infoRouter = require("./routes/stockInfo")
const bodyParser = require("body-parser");
const mutualFundRouter = require("./routes/mutualFund")

app.use(cors())
app.use(bodyParser.json())

app.use(router)
app.use(userRouter)
app.use(searchRouter)
app.use(marketRouter)
app.use(infoRouter) // This route is being used to get the stock related information, that will be displayed on the frontend
app.use(mutualFundRouter)
app.listen(3000, () => {
    console.log(`Server is running on PORT ${3000}`);
})