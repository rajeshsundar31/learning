//core
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoute");

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
app.use("/api/v1/register", authRoutes);

//=========Server======
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});