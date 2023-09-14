import { BaseContext } from "koa";

const hello = (ctx: BaseContext) => {
  ctx.status = 200;
  ctx.body = "Hello!";
};

export default hello;
