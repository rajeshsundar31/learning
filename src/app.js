//core
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoute");
const expenseRoute = require("./routes/expenseroute");

dotenv.config();

connectDB();

const app = express();

//=====MiddleWaare======
app.use(cors());
app.use(express.json());

//======Routes========
app.get('/', (req, res) => {
  res.send('API Running...');
});
app.use("/api/v1/auth/", authRoutes);
app.use("api/v1/auth/", authRoutes);
app.use("api/v1/auth/", expenseRoute);

app.use((req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `Route ${req.originalUrl} Not Found!`
  })

});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

//=========Server======
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});