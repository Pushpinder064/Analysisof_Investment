const db  = require("../utils/DB")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

async function Login(req, res){
    const {email, password} = req.body;

    if(email == null || password == null){
        res.status(201).send({
            message: "Either email or password is null"
        })
    }

    const query = `SELECT * FROM users WHERE email = $1 AND password = $2`
    const values = [email, password]
    try{
        const result = await db.query(query, values);
        
        // if we did not get any row it means user is not present in the databse
        if(result.rows.length == 0){
            res.status(404).send({
                message: "User Not Found"
            })
        }
        else{
            // As we got the user create a token for it and send it to the frontend
            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            const data = {
                email : email,
                id : result.rows[0].id
            }

            const token = jwt.sign(data, jwtSecretKey, {expiresIn : '1h'});

            res.send({token})
        }
    }catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({
            message: "An error occurred during login",
        });
    }
}

module.exports = Login