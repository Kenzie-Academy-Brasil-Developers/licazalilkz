import "dotenv/config";
import express from "express";
import { connectDataBase, createDataBaseTable } from "./database";
import { moviesRouter } from "./routes/routes";

const app = express();

app.use(express.json());
app.use("/movies", moviesRouter);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  connectDataBase();
  createDataBaseTable();
  console.log(`Server is runnic in ${PORT}`);
});
