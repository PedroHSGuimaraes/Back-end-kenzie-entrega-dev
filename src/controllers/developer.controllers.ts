import { Request, Response, response } from "express";
import {
  createDeveloper,
  createDeveloperInfoService,
  deleteDeveloper,
  getDeveloperById,
  updateDeveloperService,
} from "../services/developer.services";
import { TDeveloper, TDeveloperInfo } from "../interfaces/devloper.interface";

export const getDeveloperByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const response = await getDeveloperById(id);
  return res.status(200).json(response);
};

export const createDeveloperController = async (
  req: Request,
  res: Response
) => {
  const { name, email } = req.body;

  const developerId = await createDeveloper(name, email);

  const response = {
    id: developerId,
    name: name,
    email: email,
  };

  return res.status(201).json(response);
};

export const createDeveloperInfoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = { ...req.body, developerId: req.params.id };

  const response: TDeveloperInfo = await createDeveloperInfoService(data);

  return res.status(201).json(response);
};

export const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response: TDeveloper = await updateDeveloperService(
    req.params.id,
    req.body
  );
  return res.status(200).json(response);
};

export const deleteDeveloperController = (req: Request, res: Response) => {
  const { id } = req.params;
  const response = deleteDeveloper(id);

  return res.status(204).json(response);
};
