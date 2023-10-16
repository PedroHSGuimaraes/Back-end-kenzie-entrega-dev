import { client } from "../../database/database";
import { AppError } from "../../errors/error";
import { Request, Response, NextFunction } from "express";

export const checkIdProjects = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { developerId } = req.body;
  const query = `SELECT * FROM "developers" WHERE id = $1`;

  const data = await client.query(query, [developerId]);
  if (data.rows.length === 0) {
    const error = new AppError("Developer not found.", 404);
    return next(error);
  }
  return next();
};
