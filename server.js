import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDB from "./Config/mongoDB.js";
import adminRoutes from "./Routes/adminRoutes.js";
import marksRoutes from "./Routes/marksRoute.js";
import blogRoutes from "./Routes/blogRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    "https://teamexcellentcareerinstitute.in",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => res.send("Hello from backend!"));
app.use("/api/admin", adminRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoutes);

// Start server and connect to MongoDB
const PORT = process.env.PORT;

// Initialize MongoDB connection (non-blocking)
mongoDB().catch((error) => {
  console.error("MongoDB connection error:", error.message);
  console.error("Server will continue to run, but database operations may fail.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export for Vercel serverless deployment
export default app;
