import { Request, Response } from "express";
import {
  createProject,
  getProjectById,
  updateProject,
} from "../services/project.services";

export const getProjectByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await getProjectById(id);
  return res.status(200).json(response);
};
export const createProjectController = async (req: Request, res: Response) => {
  const { name, description, repository, startDate, endDate, developerId } =
    req.body;

  await createProject(
    name,
    description,
    repository,
    startDate,
    endDate,
    developerId
  );
  const response = {
    id: developerId,
    name: name,
    description: description,
    repository: repository,
    startDate: startDate,
    endDate: endDate || null,
    developerId: developerId,
  };

  return res.status(201).json(response);
};

export const updateProjectController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, repository, startDate, endDate, developerId } =
    req.body;

  await updateProject(
    id,
    name,
    description,
    repository,
    startDate,
    endDate,
    developerId
  );
  const response = {
    id: developerId,
    name: name || null,
    description: description,
    repository: repository,
    startDate: startDate,
    endDate: endDate || null,
    developerId: developerId,
  };

  return res.status(200).json(response);
};
