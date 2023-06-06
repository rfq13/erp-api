import { NextFunction, Request, Response } from "express";
import { ReadManyInvoiceService } from "../services/read-many.service.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const readMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const readManyInvoiceService = new ReadManyInvoiceService(db);

    const query: QueryInterface = {
      fields: (req.query.fields as string) ?? "",
      filter: (req.query.filter as any) ?? {},
      page: Number(req.query.page ?? 1),
      pageSize: Number(req.query.limit ?? 10),
      sort: (req.query.sort as string) ?? "",
    };

    const result = await readManyInvoiceService.handle(query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
