import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import salesRoutes from "./routes/salesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/sales", salesRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
