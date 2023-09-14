import Koa from "koa";
import jwt from "koa-jwt";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";

import { pino, logger } from "./logger";
import config from "./config";
import { connectDB } from "./db";
import { wellKnownRouter, loginRouter } from "./routes/unprotected";
import { helloRouter, worldRouter } from "./routes/protected";

const app = new Koa();

// Provides important security headers to make your app more secure
app.use(helmet());

// Enable cors with default options
app.use(cors());

// Logger middleware -> automatically logs request and response json, custom log by using ctx.log or logger
app.use(pino);

// Enable bodyParser with default options
app.use(bodyParser());

// these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(wellKnownRouter.routes()).use(wellKnownRouter.allowedMethods());
app.use(loginRouter.routes()).use(loginRouter.allowedMethods());

// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// do not protect swagger-json and swagger-html endpoints
app.use(jwt({ secret: config.JWT_SECRET }).unless({ path: [/^\/swagger-/] }));

// These routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(helloRouter.routes()).use(helloRouter.allowedMethods());
app.use(worldRouter.routes()).use(worldRouter.allowedMethods());

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
  }
};

startServer();
