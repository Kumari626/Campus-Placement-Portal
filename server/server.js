const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

console.log(process.env.MONGODB_URI);

const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());

// Resume files access
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("Placement Portal Backend Running...");
});


const PORT = 5000;


// Database Connection
connectDB();


// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});