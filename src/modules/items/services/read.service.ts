import { ItemEntity, ItemInterface } from "../entities/item.entity.js";
import { ItemRepository } from "../repositories/item.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const itemRepository = new ItemRepository(this.db);
    const result = (await itemRepository.read(id)) as unknown as ItemInterface;

    const item: ItemInterface = {
      _id: result._id as string,
      name: result.name as string,
      code: result.code as string,
      chartOfAccount: result.chartOfAccount as string,
      hasExpiryDate: result.hasExpiryDate as boolean,
      hasProductionNumber: result.hasProductionNumber as boolean,
      converter: result.converter as any,
      unit: result.unit as string,
      createdBy_id: result.createdBy_id,
      createdAt: new Date(result.createdAt as string),
    };
    const itemEntity = new ItemEntity(item);

    return itemEntity.item;
  }
}
