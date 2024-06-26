const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const categoryRouter = require("./routes/categoryRouter");
const restaurantRouter = require("./routes/restaurantRouter");
const foodsRouter = require("./routes/foodsRouter");
const ratingRouter = require("./routes/ratingRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const port = process.env.PORT || 6013;

dotenv.config();

// -> CONNECT DB
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log(" -> Dataabse Connected"))
  .catch((err) => console.log(err));

// -> MIDDILEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -> Auth Router
app.use("/api/auth", authRouter);

// -> user Router
app.use("/api/users", userRouter);

// -> Categories Router
app.use("/api/categories", categoryRouter);

// -> Restaurants Router
app.use("/api/restaurant", restaurantRouter);

// -> Foods Router
app.use("/api/foods", foodsRouter);

// -> Rating Router
app.use("/api/rating", ratingRouter);

app.listen(port, () => console.log(`Server is Running on ${port}`));
