import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import mainRoutes from "./routes/routes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//connect to MongoDB
connectDB();

//middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//main routes
app.use("/", mainRoutes);

//root route
app.get("/", (req, res) => {
  res.send("SwiftShare's Backend is Working!");
});

app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});
