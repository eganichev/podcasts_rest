require("dotenv").config();
import express from "express";
import logger from "morgan";
import cors from "cors";
import podcasts from "./routes/podcasts";
import heartbeat from "./routes/heartbeat";
import { handleErrors } from "./middleware/error";

import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: Number(process.env.LIMITER_WINDOWMS), //15 * 60 * 1000 - 15 minutes
  limit: Number(process.env.LIMITER_LIMIT), // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const app = express();

app.use(limiter);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/heartbeat", heartbeat);
app.use("/podcasts", podcasts);
app.use(handleErrors);

const start = (): void => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
