const express = require("express");
const router = express.Router();


const protect = require("../config/middleware");



const { addExpenses } = require("../controller/expense-controller");

router.post("/addExpenses", protect, addExpenses);


module.exports = router;