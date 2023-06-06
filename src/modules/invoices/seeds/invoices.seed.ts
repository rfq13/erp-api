import { db } from "@src/database/database.js";
import { CustomerInterface } from "@src/modules/customers/entities/customer.entity.js";
import { CustomerRepository } from "@src/modules/customers/repositories/customer.repository.js";

const customerRepository = new CustomerRepository(db);
const result = await customerRepository.readMany({
  fields: "",
  filter: {},
  page: 1,
  pageSize: 2,
  sort: "",
});

const customers = result.data as unknown as Array<CustomerInterface>;

export const invoicesSeed = [
  {
    customer_id: customers[0]._id,
    total: 500000,
    createdAt: new Date(),
  },
];
