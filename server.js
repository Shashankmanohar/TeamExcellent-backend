import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDB from "./Config/mongoDB.js";
import adminRoutes from "./Routes/adminRoutes.js";
import marksRoutes from "./Routes/marksRoute.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://teamexcellentcareerinstitute.in",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

mongoDB();

app.get('/', (req, res) => res.send('Hello from backend!'));
app.use('/api/admin', adminRoutes);
app.use('/api/marks', marksRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
