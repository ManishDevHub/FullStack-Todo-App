import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';

import todoRoute from './routes/todo.routes.js';
import userRoute from './routes/user.routes.js';
import cookieParser from 'cookie-parser'

const app = express();
const port = process.env.PORT || 4000;
const DB_URL = process.env.MONGODB_URL;

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ("Allowed frontend origin:",process.env.FRONTEND_URL),
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/todo", todoRoute);
app.use("/user", userRoute);

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
