import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";

export const validate = (body: any) => {
  const validation = new Validatorjs(body, {
    name: "required",
    unit: "required",
    code: "required",
    chartOfAccount: "required",
    hasExpiryDate: "required|boolean",
    hasProductionNumber: "required|boolean",
    converter: "required",
    "converter.*.name": "required",
    "converter.*.multiply": "required|numeric",
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};
