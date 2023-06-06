import { ObjectId } from "mongodb";

export interface InvoiceInterface {
  _id?: string | ObjectId;
  customer_id: string | ObjectId;
  total: number;
}

export class InvoiceEntity {
  public invoice: InvoiceInterface;

  constructor(invoice: InvoiceInterface) {
    this.invoice = invoice;
  }
}
