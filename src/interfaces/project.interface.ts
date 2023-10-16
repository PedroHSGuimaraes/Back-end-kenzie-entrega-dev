import { QueryResult } from "pg";
export interface IProject {
  id: number;
  name: string;
  description: string;
  repository: string;
  startdate: Date;
  enddate: Date;
  developerid: number;
}

export type TProject = {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date | null;
  projectDeveloperName: string;
};

export type TProjectCreate = {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date | null;
  projectDeveloperName: string;
};

export type TProjectUpdate = Partial<TProjectCreate>;
export type TProjectResult = QueryResult<TProject>;
export type TProjectRead = TProject[];
