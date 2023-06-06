import { ObjectId } from "mongodb";

export interface ItemInterface extends CreateItemInterface {
  _id: string;
}

export interface CreateItemInterface {
  createdAt?: string | Date;
  createdBy_id?: string | ObjectId;
  code: string;
  name: string;
  chartOfAccount: string;
  hasProductionNumber: boolean;
  hasExpiryDate: boolean;
  unit: string;
  converter: {
    name: string;
    multiply: number;
  }[];
}

export const restricted = [];

export class ItemEntity {
  public item: ItemInterface | CreateItemInterface;

  constructor(item: ItemInterface | CreateItemInterface) {
    this.item = item;
  }
}
