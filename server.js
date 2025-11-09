import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDB from "./Config/mongoDB.js";
import adminRoutes from "./Routes/adminRoutes.js";
import marksRoutes from "./Routes/marksRoute.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      "https://teamexcellentcareerinstitute.in",
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:4173",
    ];
    
    // Allow if origin is in the list or allow all for development
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      // For development, allow all origins
      callback(null, true);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => res.send("Hello from backend!"));
app.use("/api/admin", adminRoutes);
app.use("/api/marks", marksRoutes);

// Start server and connect to MongoDB
const PORT = process.env.PORT || 5000;

// Initialize MongoDB connection (non-blocking)
mongoDB().catch((error) => {
  console.error("MongoDB connection error:", error.message);
  console.error("Server will continue to run, but database operations may fail.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
