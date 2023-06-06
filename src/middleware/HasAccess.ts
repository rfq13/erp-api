import { RoleRepository } from "@src/modules/roles/repositories/role.repository.js";
import { UserSession } from "./Authenticated";
import { db } from "@src/database/database.js";

export default function HasAccess(access: string) {
  return async (req: any, res: any, next: any) => {
    const user = req.session.user as UserSession;

    const roleRepository = new RoleRepository(db);
    const role: any = await roleRepository.aggregate(
      [
        {
          $match: {
            $and: [
              { _id: user.role_id },
              { permissions: { $elemMatch: { $eq: access } } },
            ],
          },
        },
      ],
      { page: 1, pageSize: 1 }
    );

    if (role?.data?.length > 0) {
      next();
    } else {
      return res.status(403).json({
        code: 403,
        message: "Forbidden Access",
      });
    }
  };
}
