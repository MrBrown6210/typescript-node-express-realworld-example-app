import User from "../database/models/user.model";

declare module "express" {
  export interface Request {
    profile?: User;
    payload?: {
      id: string;
      username: string;
      exp: number;
      iat: number;
    };
  }
}
