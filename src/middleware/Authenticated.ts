import { ApiError } from "@point-hub/express-error-handler";
import { NextFunction, Request, Response } from "express";
import { VerifyTokenUserService } from "@src/modules/auth/services/verify-token.service.js";
import { db } from "@src/database/database.js";
import { ObjectId } from "mongodb";

export interface UserSession {
  _id?: string | ObjectId;
  name?: string;
  email?: string;
  username?: string;
  role_id?: string | ObjectId;
}

export const Authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization ?? "";

    if (authorizationHeader === "") {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized Access",
      });
    }

    const verifyTokenUserService = new VerifyTokenUserService(db);
    const result = await verifyTokenUserService.handle(authorizationHeader);

    const currentUser: UserSession = {
      _id: result._id,
      name: result.name,
      email: result.email,
      username: result.username,
      role_id: result.role_id,
    };

    req.session.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};
