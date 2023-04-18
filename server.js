import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import voucherRouter from "./routes/voucherRoute.js";
import { port } from "./config/Address.js";
import imageRouter from "./routes/imageRoute.js";


dotenv.config();

const app = express();

// const corsOption = {
//     "origin": "http://localhost"
// }

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));


app.use(voucherRouter);
app.use(imageRouter);

app.listen(port, () => console.log(`Server Up and Running in port: ${port}`));
