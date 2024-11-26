import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./route";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 4201;

app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));

app.use(router)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});