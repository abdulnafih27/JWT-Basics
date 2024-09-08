const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors');
// const auth = require('../middleware/auth');

const login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        throw new BadRequest('Please Provide username and Password');
    }
    //demo id, which can be accessed trough db
    const id = new Date().getDate()

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn : '30d'});
    res.status(200).json({msg : 'User created', token : token});
}

const dashboard = async(req, res) => { 
    const {username} = req.user;
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({msg : `Hello, ${username}`, secret : `Here is your autherized data, your lucky number is ${luckyNumber}`});

}


module.exports = {
    login,
    dashboard
}