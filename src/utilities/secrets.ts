import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env" });

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET env is missing!");
}

if (!process.env.SESSION_SECRET) {
  console.warn("SESSION_SECRET env is missing!");
}

export const ENVIRONMENT = process.env.APP_ENV || "dev";
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const IS_TEST = ENVIRONMENT === "test";
export const APP_PORT = parseInt(process.env.APP_PORT) || 3000;
export const LOG_DIRECTORY = process.env.LOG_DIRECTORY || path.resolve("logs");
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const SESSION_SECRET = process.env.SESSION_SECRET || "secret";
export const DB = {
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_USER_PWD || "secret",
  HOST: process.env.DB_HOST || "localhost",
  NAME: process.env.DB_NAME || "conduit",
  PORT: parseInt(process.env.DB_PORT) || 27017,
};
export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/Mocks";
