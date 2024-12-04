require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute= require('./routes/authRoutes')
const laptopRoutes = require("./routes/laptopRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const issueRoutes = require("./routes/issueRoutes");
const adminRoutes = require("./routes/adminRoutes");
const requestRoute= require('./routes/requests')
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Test Route
app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/users", authRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/laptops", laptopRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/requests", requestRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
