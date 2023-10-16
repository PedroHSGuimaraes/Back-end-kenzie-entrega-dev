import { QueryResult } from "pg";

export interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

export type TDeveloperInfo = {
  id: number;
  developerSince: Date;
  preferredOS: string;
  developerId: number;
};
export type TDeveloperInfoResponse = {
  id: number;
  developerSince: Date | null;
  preferredOS: string | null;
  developerId: number;
};
export type TCreatDeveloperInfo = {
  developerSince: Date;
  preferredOS: string;
  developerId: number;
};

export type TDeveloperInfoResult = QueryResult<TDeveloperInfo>;
export type TDeveloperInfoUpdate = Partial<TDeveloperInfo>;

export type TDeveloper = {
  id: number;
  email: string;
  name: string;
};

export type TDeveloperResponse = {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: Date | null;
  developerInfoPreferredOS: string | null;
};

export type TCreateDeveloper = Omit<TDeveloper, "id">;
export type TDeveloperResult = QueryResult<TDeveloper>;
export type TDeveloperRead = TDeveloper[];
export type TDevelopUpdate = Partial<TDeveloper>;
