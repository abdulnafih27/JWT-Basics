const jwt = require('jsonwebtoken');
const { unAuthorizedError } = require('../errors');

const authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new unAuthorizedError('No Token provided');
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decode;
        req.user = {id, username}
        next();
    } catch (error) {
        throw new unAuthorizedError('Not authorized to access this route');
    }
}


module.exports = authorizationMiddleware;