require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const port = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);

//uncaught routes
app.all("*", (req, res, next) => {
  //we send the err obj to next so it skip other middleware stacks and goes to error middleware
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// giving 4 parameters,express recognize this is error handling middleware
//Global Error handling Middleware
app.use(globalErrorHandler);

const start = async () => {
  try {
    app.listen(port, (req, res) => {
      console.log("Started listening");
    });
  } catch (error) {
    console.log("Error starting the server", error);
  }
};
start();
