
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ auth: false, message: 'authorization is required' });

    try {
        const decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

        const userId = req.params.id;

        if (userId !== decoded.id) res.status(403).json({ auth: false, message: 'Token does not belong to this user' })
        
        req.decoded = decoded;
        next();
    } catch (err) {
        res.status(403).json({ auth: false, message: 'Invalid token' });
    }

};


module.exports = {
    verifyToken,
}