import pinoLogger from "koa-pino-logger";

const pino = pinoLogger();
const { logger } = pino;

export {
  pino, // to be used as a middleware
  logger, // to be used only where ctx.log is not available
};
