import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import restaurantRoutes from "./routes/restaurant.route.js";
import ItemsRoutes from "./routes/menuItems.routes.js"
import cartRoutes from "./routes/cart.routes.js"

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/items", ItemsRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Restaurant service is running on PORT:${PORT}`);
  });
});
