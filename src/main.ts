import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mainRouter from "./routers";
import errorHandler from "./middlewares/errorHandler";
// import updateLocations from "./utils/updateLocations";

dotenv.config();
// updateLocations();

const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT + ".");
});
