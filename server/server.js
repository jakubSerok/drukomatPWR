import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import drukomatRouter from "./routes/drukomatRoute.js";
import orderRouter from "./routes/orderRoute.js";
import draftRoute from "./routes/draftRoute.js";
import wareHouseRoute from "./routes/wareHouseRoute.js";
import printingModuleRoute from "./routes/printingModuleRoute.js";
import order2Router from "./routes/Order.js"; // Import the new order2 route
import drukomat2Router from "./routes/Drukomat.js"; // Import the new drukomat2 route
import "dotenv/config";
import dotenv from "dotenv";

dotenv.config();
// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/drukomat", drukomatRouter);
app.use("/api/orders", orderRouter);
app.use("/api/drafts", draftRoute);
app.use("/api/printing-modules", printingModuleRoute);
app.use("/api/warehouses", wareHouseRoute);
app.use("/api/orders2", order2Router); // Use the new order2 route
app.use("/api/drukomat2", drukomat2Router); // Use the new drukomat2 route

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
