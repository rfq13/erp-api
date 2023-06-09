import { NextFunction, Request, Response } from "express";
import { ReadManyCustomerService } from "../services/read-many.service.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const readMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const readManyCustomerService = new ReadManyCustomerService(db);

    const query: QueryInterface = {
      fields: (req.query.fields as string) ?? "",
      filter: (req.query.filter as any) ?? {},
      page: Number(req.query.page ?? 1),
      pageSize: Number(req.query.limit ?? 10),
      sort: (req.query.sort as string) ?? "",
    };

    const result = await readManyCustomerService.handle(query);
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
