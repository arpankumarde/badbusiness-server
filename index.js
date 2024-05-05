import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

connectDb();

app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/services", serviceRoutes);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
