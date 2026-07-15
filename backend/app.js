//node/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const errorHandler = require("./middleware/module1Middleware/errorHandler");

const adminRoutes = require("./routes/Auth/adminRoutes");
const jobRoutes = require("./routes/p&r/jobRoutes");
const authRoutes = require("./routes/p&r/authRoutes");
const jobApplyRoutes = require("./routes/p&r/JobApplyRoutes");

const app = express();

app.use(helmet());

app.use(compression());

app.use(morgan("combined"));

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

app.use("/api/admin", adminRoutes);
app.use("/api", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobApplyRoutes);

app.use(errorHandler);

module.exports = app;