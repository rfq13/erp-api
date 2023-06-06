import { ObjectId } from "mongodb";
import { InvoiceRepository } from "../repositories/invoice.repository.js";
import DatabaseConnection, {
  ReadOptionsInterface,
} from "@src/database/connection.js";
import { fields, limit, page, skip, sort } from "@src/database/mongodb-util.js";

export class ReadInvoiceService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, filter?: any) {
    const invoiceRepository = new InvoiceRepository(this.db);
    console.log("read", id);
    const aggregates: any = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      { $limit: 1 },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $addFields: {
          customer: { $arrayElemAt: ["$customer", 0] },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            _id: "$_id",
            customer: "$customer",
            date: "$createdAt",
            total: "$total",
          },
        },
      },
    ];

    if (filter && filter.fields) {
      aggregates.push({ $project: fields(filter.fields) });
    }

    if (filter && filter.restrictedFields) {
      aggregates.push({ $unset: filter.restrictedFields });
    }

    const aggregateResult = invoiceRepository.aggregate(aggregates, {
      page: 1,
      pageSize: 10,
    });

    const result = (await aggregateResult) as any;

    return result.data[0];
  }
}
