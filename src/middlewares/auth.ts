import { Context, Next } from "koa";
import jwt from "jsonwebtoken";

import config from "../config";

const auth = async (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "Authorization header missing or invalid token" };
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    ctx.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: "Invalid token" };
  }
};

export default auth;
