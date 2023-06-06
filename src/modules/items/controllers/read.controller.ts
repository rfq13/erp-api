import { NextFunction, Request, Response } from "express";
import { ItemInterface } from "../entities/item.entity.js";
import { ReadItemService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readItemService = new ReadItemService(db);
    const result = (await readItemService.handle(
      req.params.id
    )) as ItemInterface;

    console.log(result);
    res.status(200).json({
      data: {
        _id: result._id,
        name: result.name,
        code: result.code,
        unit: result.unit,
        hasExpiryDate: result.hasExpiryDate,
        hasProductionNumber: result.hasProductionNumber,
        converter: result.converter,
        chartOfAccount: result.chartOfAccount,
        createdAt: result.createdAt,
        createdBy_id: result.createdBy_id,
      },
    });
  } catch (error) {
    next(error);
  }
};
