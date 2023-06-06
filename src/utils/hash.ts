import { hash as hashData, verify as verifyData } from "argon2";
import objectHash from "object-hash";

export const hash = async (data: string) => {
  try {
    return await hashData(data);
  } catch (error) {
    throw error;
  }
};

export const verify = async (encryptedData: string, plainData: string) => {
  try {
    return await verifyData(encryptedData, plainData);
  } catch (error) {
    throw error;
  }
};

export const hashObject = (obj: object) => {
  return objectHash(obj);
};
