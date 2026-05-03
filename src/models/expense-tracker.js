const mongoose = require("mongoose");


const expenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auth-user',
            required: true
        },
        title: {type: String, required: true},
        amount: {type: Number, required: true},
        category: {type: String, default: "General"},
        date: {type: Date, default: Date.now},
        note: {type: String}
    },
    {timestamps: true}
)

module.exports = mongoose.model('Expenses', expenseSchema);