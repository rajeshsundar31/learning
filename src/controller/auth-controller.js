const userModel = require('./models/auth-user.js');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await userModel.find({ email });
        if (existingUser) {
            return res.status(400).json({message: "user already Exist"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //createUser
        const user = await userModel.create({
            name,
            email,
            password: hashPassword
        });
        res.status(201).json({
            message: "user created Successfully!",
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message})

    }
}