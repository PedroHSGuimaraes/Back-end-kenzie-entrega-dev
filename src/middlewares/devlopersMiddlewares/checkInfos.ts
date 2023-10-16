import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/error";
import { client } from "../../database/database";

export const checkInfos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const checkQuery = `
      SELECT * FROM "developerInfos" WHERE "developerId" = $1
    `;

  const result = await client.query(checkQuery, [id]);

  if (result.rows.length > 0) {
    throw new AppError("Developer infos already exists.", 409);
  }

  return next();
};
