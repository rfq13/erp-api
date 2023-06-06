import { InvoiceRepository } from "../repositories/invoice.repository.js";
import DatabaseConnection, {
  QueryInterface,
} from "@src/database/connection.js";

export class ReadManyInvoiceService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const invoiceRepository = new InvoiceRepository(this.db);
    return await invoiceRepository.readMany(query);
  }
}
