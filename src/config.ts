import dotenv from "dotenv";

dotenv.config();

type Config = {
  NODE_ENV: string;
  PORT: string;
  JWT_SECRET: string;
  DBHOST: string;
  DBUSER: string;
  DBPWD: string;
  DBNAME: string;
};

const config: Config = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT: process.env.PORT!,
  DBHOST: process.env.DBHOST!,
  DBUSER: process.env.DBUSER!,
  DBPWD: process.env.DBPWD!,
  DBNAME: process.env.DBNAME!,
  JWT_SECRET: process.env.JWT_SECRET!,
};

export default config;
