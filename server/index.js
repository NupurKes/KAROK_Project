import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import cors from "cors"
dotenv.config();


// Routes
const app = express();

// images for public
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Middleware
app.use(express.json()); // Allows express to read a request body
// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
mongoose
    .connect(process.env.MONGO_DB)
    .then(() =>
        app.listen(process.env.PORT, () =>
            console.log(`Listening at ${process.env.PORT}`)
        )
    )
    .catch((error) => console.log(error));


// usage of routes
app.use('/auth', AuthRoute)
app.use('/user',UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)