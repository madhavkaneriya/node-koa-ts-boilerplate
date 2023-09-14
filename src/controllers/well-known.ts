import { BaseContext } from "koa";
import AppDataSource from "../db";

const ready = (ctx: BaseContext) => {
  if (!AppDataSource.isInitialized) {
    ctx.status = 504;
    ctx.body = { error: "Not connected to SQL" };
  } else {
    ctx.body = { status: "UP" };
  }
};

const live = (ctx: BaseContext) => {
  ctx.body = { status: "OK" };
};

export { ready, live };
