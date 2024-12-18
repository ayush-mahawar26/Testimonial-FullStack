import cors from "cors";
import express, { Express, Request, Response } from "express";
import { authRouter } from "./controllers/auth.controller";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { dashboardRouter } from "./controllers/dashboard.controllers";
import { testimonialRoute } from "./controllers/testimonial.controller";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app: Express = express();

// middleware
const corsOptions = {
  origin: "*",
};
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/testimonials", testimonialRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
