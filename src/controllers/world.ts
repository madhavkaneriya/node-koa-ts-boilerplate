import { BaseContext } from "koa";

const world = (ctx: BaseContext) => {
  ctx.status = 200;
  ctx.body = "World!";
};

export default world;
