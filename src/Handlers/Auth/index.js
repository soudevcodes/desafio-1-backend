
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserModel = require('../../Models/User');

const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) res.status(404).json({ message: 'user not found' });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
        const token = jwt.sign(
            { id: user._id, email },
            process.env.TOKEN_KEY,
        );

        user.token = token;

        res.status(200).json({ ...user.toJSON(), token });
    }
};


const verifyToken = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ auth: false, message: 'authorization is required' });

    try {
        const decoded = jwt.verify(authorization, process.env.TOKEN_KEY);
        
        res.status(200).json({ auth: true, user: decoded });
    } catch (err) {
        res.status(403).json({ auth: false, message: 'Invalid token' });
    }

};

module.exports = {
    login,
    verifyToken,
};