const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/data", require("./routes/dataRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
