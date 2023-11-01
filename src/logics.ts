import { Request, Response } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";

export const getMoviesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query: string = `SELECT * FROM movies WHERE id = $1;`;

  const data: QueryResult = await client.query(query, [id]);

  return res.status(200).json(data.rows[0]);
};

export const getMovies = async (req: Request, res: Response) => {
  const query = `SELECT * FROM movies;`;

  const data = await client.query(query);

  return res.status(200).json(data.rows);
};

export const createTable = async (req: Request, res: Response) => {
  const { name, category, duration, price } = req.body;

  const query = `INSERT INTO movies (name, category, duration, price) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;
  const queryConfig: QueryConfig = {
    text: query,
    values: [name, category, duration, price],
  };

  const data = await client.query(queryConfig);
  console.log(data);

  return res
    .status(201)
    .json({ message: "Movie created sucessfuly", movies: data.rows[0] });
};

export const deleteMovies = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `DELETE FROM movies WHERE id = $1;`;
  const queryConfig: QueryConfig = {
    text: query,
    values: [id],
  };

  await client.query(queryConfig);

  return res.status(200).json({ message: "Movie deleted with sucessfuly !" });
};

export const editMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = format(
    `UPDATE movies SET (%I) = ROW(%L) WHERE id = (%L) RETURNING *; `,
    Object.keys(req.body),
    Object.values(req.body),
    id
  );
  const data = await client.query(query);

  console.log(data);
  return res.status(200).json({message:"sucessfuly edited !", movies: data.rows[0]});
};
