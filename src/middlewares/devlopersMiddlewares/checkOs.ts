import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/error";

export const checkOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { preferredOS } = req.body;
  const validOS = ["Windows", "Linux", "MacOS"];

  if (!validOS.includes(preferredOS)) {
    throw new AppError("Invalid OS option.", 400);
  }

  return next();
};
