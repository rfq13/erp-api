import { ItemRepository } from "../repositories/item.repository.js";
import DatabaseConnection, {
  DeleteOptionsInterface,
} from "@src/database/connection.js";

export class DestroyItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, options: DeleteOptionsInterface) {
    const itemRepository = new ItemRepository(this.db);
    const response = await itemRepository.delete(id, options);
    console.log(response);
    return;
  }
}
