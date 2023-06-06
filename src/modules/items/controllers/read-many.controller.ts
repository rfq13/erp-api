import { NextFunction, Request, Response } from "express";
import { ItemInterface } from "../entities/item.entity.js";
import { ReadManyItemService } from "../services/read-many.service.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export interface PaginationInterface {
  page: number;
  pageCount: number;
  pageSize: number;
  totalDocument: number;
}

export interface ResponseInterface {
  data: Array<ItemInterface>;
  pagination: PaginationInterface;
}

export const readMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const readManyItemService = new ReadManyItemService(db);

    const iQuery: QueryInterface = {
      fields: (req.query.field as string) ?? "",
      filter: (req.query.filter as any) ?? {},
      page: Number(req.query.page ?? 1),
      pageSize: Number(req.query.pageSize ?? 10),
      sort: (req.query.sort as string) ?? "",
    };

    const result = await readManyItemService.handle(iQuery);

    const pagination: PaginationInterface = {
      page: result.pagination.page,
      pageSize: result.pagination.pageSize,
      pageCount: result.pagination.pageCount,
      totalDocument: result.pagination.totalDocument,
    };

    const response: ResponseInterface = {
      data: result.items,
      pagination: pagination,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
