import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDB from "./Config/mongoDB.js";
import adminRoutes from "./Routes/adminRoutes.js";
import marksRoutes from "./Routes/marksRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

mongoDB();
app.get('/', (req, res) => res.send('Hello from backend!'));
app.use('/api/admin', adminRoutes);
app.use('/api/marks', marksRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
