const express = require("express");
const router = express.Router();


const protect = require("../config/middleware");



const { addExpenses, getExpenses } = require("../controller/expense-controller");

router.post("/addExpenses", protect, addExpenses);

router.get("/getexpenses", protect, getExpenses);


module.exports = router;