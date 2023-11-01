import { Router } from "express";
import {
  createTable,
  deleteMovies,
  editMovie,
  getMovies,
  getMoviesById,
} from "../logics";
import { verifyName } from "../middlewares/verifyName";
import { verifyId } from "../middlewares/verifyId";

export const moviesRouter = Router();

moviesRouter.post("/", verifyName, createTable);
moviesRouter.get("/", getMovies);
moviesRouter.get("/:id", verifyId, getMoviesById);
moviesRouter.delete("/:id",verifyId , deleteMovies);
moviesRouter.patch("/:id", verifyId, verifyName, editMovie);
