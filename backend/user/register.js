// Get the db instance
const db = require("../utils/DB.js")

async function RegisterUser(req, res) {
    const {email, password} = req.body;
    // console.log(req.body)

    const query = `INSERT INTO users (email, password) VALUES($1, $2) RETURNING id`
    const values = [email, password]

    try{
        const result = await db.query(query, values);
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
}

module.exports = RegisterUser;