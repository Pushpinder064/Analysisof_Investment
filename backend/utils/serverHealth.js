const db = require("./DB.js")

function serverHealth(req, res) {
    if(db){
        res.send("Database connected Succesfuly")
    }else{
        res.status(503).send(
            {
                "message": "Error Conneting with database"
            }
        )
    }
}

module.exports = serverHealth