const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const mainRouter = require("./routes/mainRouter.js");
//routers
const authRouter = require("./routes/auth");
const gardensRouter = require("./routes/gardensRouter");
const plantsRouter = require("./routes/plantsRouter");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // // store: ... , // Redis, Memcached, etc. See below.
  })
);

// app.get("/", (req, res) => {
//   res.send("<h1> Start Page </h1>");
// });
// routes
app.use("/api/v1/auth", authRouter);

app.use("/api/v1", mainRouter);

// app.use("/api/v1/gardens", gardensRouter);

// app.use("/api/v1/plants", plantsRouter);

// const port = process.env.PORT || 3000;

module.exports = app;
