import { ObjectId } from "mongodb";

export interface CustomerInterface {
  _id?: string | ObjectId;
  name: string;
  phone: string;
}

export class CustomerEntity {
  public customer: CustomerInterface;

  constructor(customer: CustomerInterface) {
    this.customer = customer;
  }
}
