
const bcrypt = require('bcrypt');

const UserModel = require('../../Models/User');


const indexUser = async (req, res) => {

    const { offset = 0, limit = 100 } = req.query;

    const users = await UserModel.find({}).skip(offset).limit(100);

    res.status(200).json(users);
 
};

const getUser = async (req, res) => {

    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
};

const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    const newPassword = await bcrypt.hash(password, 8);

    try {
        const user = await UserModel.create({
            name,
            email,
            password: newPassword,
        });
        
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const updateUser = async (req, res) => {

    const { email, name } = req.body;
    const { id } = req.params;

    const existsUser = await UserModel.findById(id);

    if (!existsUser) res.status(404).json({ message: 'User not found' });

    existsUser.email = email || existsUser.email;
    existsUser.name = name || existsUser.name;

    try {
        await existsUser.save();
        res.status(200).json(existsUser);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteUser = async (req, res) => {

    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) res.status(404).json({ message: 'User not found' });
    
    await user.delete();

    res.status(200).json(user);
};


module.exports = {
    createUser,
    updateUser,
    getUser,
    deleteUser,
    indexUser,
}