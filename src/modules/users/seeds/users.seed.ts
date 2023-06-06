import { db } from "@src/database/database.js";
import { RoleInterface } from "@src/modules/roles/entities/role.entity.js";
import { RoleRepository } from "@src/modules/roles/repositories/role.repository.js";
import { hash } from "@src/utils/hash.js";

const roleRepository = new RoleRepository(db);
const result = await roleRepository.readMany({
  fields: "",
  filter: {},
  page: 1,
  pageSize: 2,
  sort: "",
});

const roles = result.data as unknown as Array<RoleInterface>;

export const usersSeed = [
  {
    username: "admin",
    email: "admin@example.com",
    password: await hash("admin2024"),
    name: "Admin",
    role_id: roles[0]._id,
  },
  {
    username: "user",
    email: "admin@example.com",
    password: await hash("user2024"),
    name: "Admin",
    role_id: roles[1]._id,
  },
];
