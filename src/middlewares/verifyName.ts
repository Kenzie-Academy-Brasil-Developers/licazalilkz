import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";

export const verifyName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const nameMovie: string = req.body.name as string;
  const query: string = `SELECT * FROM movies WHERE name = $1;`;

  const queryResult: QueryResult = await client.query(query, [nameMovie]);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({ message: "Movie name already exists!" });
  }

  return next();
};
