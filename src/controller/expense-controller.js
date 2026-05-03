const expenses = require("../models/expense-tracker");



exports.addExpenses = async (req, res) => {
    try {
        const {title, amount, category, date} = req.body;

        const expense = await expenses.create({
            user: req.user.id,
            title,
            amount,
            category,
            date,
            note
        });

        res.status(201).json({
            message: "Expense added",
            expense
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}