const { Client }  = require("pg")

const client = new Client({
    host:"localhost",
    port:5432,
    password:"casper@21",
    database:"MajorProject",
    user:"postgres"
})

client.connect()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Error connecting with the database: " + err)
    });

module.exports = client;