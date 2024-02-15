const express = require('express')
const dotenv = require("dotenv")
const morgan =require("morgan")
const cors =require("cors")
const connectDB = require('./config/db')

dotenv.config()
connectDB();
const app = express();
app.use('/api/data', require("./routes/dataRoutes"))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


