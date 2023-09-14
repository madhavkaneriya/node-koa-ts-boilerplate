import "reflect-metadata";
import { DataSource } from "typeorm";
import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions";
import { logger } from "./logger";
import config from "./config";

const rootDir = config.NODE_ENV === "production" ? "dist/src" : "src";

const options: SqlServerConnectionOptions = {
  name: "default",
  type: "mssql",
  host: config.DBHOST,
  port: 1433,
  username: config.DBUSER,
  password: config.DBPWD,
  database: config.DBNAME,
  schema: "dbo",
  synchronize: false,
  logging: false,
  options: {
    enableArithAbort: true,
    encrypt: true,
    cancelTimeout: 8000,
    debug: {
      payload: true,
      data: true,
    },
  },
  pool: { max: 30 },
  entities: [`${rootDir}/orm/**/*.{ts,js}`],
  migrations: [`${rootDir}/migrations/*{.ts,.js}`],
  migrationsTableName: "migration_table",
  extra: {
    trustServerCertificate: true,
  },
  requestTimeout: 90000,
};

const AppDataSource = new DataSource(options);

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("Data Source has been initialized");
  } catch (err) {
    logger.error("Error occurred during Data Source initialization : ", err);
  }
};

export default AppDataSource;
