const userModel = require('./models/auth-user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

exports.loginUser = async (req, res) => {

   try {
    
    const {email, password} = req.body;

    const findUser = userModel.findOne({email});

    if (!findUser) {
        return res.status(400).json({message :"Invalid Credentials"});
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch){
        return res.status(400).json({message: "Invalid Credentials"});
    }

    const token = jwt.sign(
        {id: findUser._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.json({
        message: "Login Successfully!",
        token
    })
    
   } catch (error){
    return res.status(500).json({message: error.message});
   }
}