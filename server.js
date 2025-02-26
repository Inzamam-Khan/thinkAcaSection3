const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Rate limiting - 100 requests per hour per user
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per hour
  message: "Too many requests, please try again later."
});

app.use(limiter);

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
