import { QueryConfig } from "pg";
import { client } from "../database/database";
import {
  IDeveloper,
  TCreatDeveloperInfo,
  TDevelopUpdate,
  TDeveloper,
  TDeveloperInfo,
  TDeveloperInfoResult,
  TDeveloperInfoUpdate,
  TDeveloperResult,
} from "../interfaces/devloper.interface";
import format from "pg-format";

export const getDeveloperById = async (id: string) => {
  const queryString = `
                              SELECT
                                d."id" AS "developerId",
                                d."name" AS "developerName",
                                d."email" AS "developerEmail",
                                di."developerSince" AS "developerInfoDeveloperSince",
                                di."preferredOS" AS "developerInfoPreferredOS"
                              
                              FROM
                              "developers" d
                              LEFT JOIN
                                "developerInfos" di
                              ON
                                d."id" = di."developerId"
                              WHERE
                                d."id" = $1;
                      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const data = await client.query<IDeveloper>(queryConfig);
  return data.rows[0];
};
export const createDeveloper = async (name: string, email: string) => {
  const queryString = `INSERT INTO "developers" ("name", "email") VALUES ($1, $2) RETURNING *`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name, email],
  };
  const data = await client.query<IDeveloper>(queryConfig);
  return data.rows[0].id;
};

export const createDeveloperInfoService = async (
  data: TCreatDeveloperInfo
): Promise<TDeveloperInfo> => {
  const query: string =           `
                                    INSERT INTO "developerInfos" ("developerSince", "preferredOS", "developerId") VALUES ($1, $2, $3) RETURNING *;
                                  `;
  const queryResult: TDeveloperInfoResult = await client.query(query, [
    data.developerSince,
    data.preferredOS,
    data.developerId,
  ]);

  return queryResult.rows[0];
};

export const updateDeveloperService = async (
  id: string,
  data: TDevelopUpdate
): Promise<TDeveloper> => {
  const queryFormat: string = format(
    `UPDATE "developers" SET (%I)= ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TDeveloperResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};

export const deleteDeveloper = async (id: string): Promise<void> => {
  const queryString =    `
                          DELETE FROM "developers"
                          WHERE id = $1
                        `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query<IDeveloper>(queryConfig);
};
