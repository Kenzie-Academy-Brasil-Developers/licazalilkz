import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";

export const verifyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idMovie: string = req.params.id as string;
  const query: string = `SELECT * FROM movies WHERE id = $1;`;

  const queryResult: QueryResult = await client.query(query, [idMovie]);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({ message: "Movie id doesnt exists!" });
  }

  return next();
};
