import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import routes from "./routes";

dotenv.config();

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, error => {
    if (error) {
        throw error;
    }
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({createParentPath: true}));
app.use("/api", routes);

app.listen(process.env.PORT, () => {
    console.log("🚀 Running at port " + process.env.PORT);
});