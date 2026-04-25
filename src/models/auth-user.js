const mongoose = require('mongoosee');

const userSchema = new mongoose.schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
},
    { timeStamps: true }
);

module.exports = mongoose.model('auth-user', userSchema);