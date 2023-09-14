import { Context } from "koa";
import jwt from "jsonwebtoken";

import config from "../config";

type AuthReqBody = {
  username?: string;
  password?: string;
};

const login = (ctx: Context) => {
  const { username, password } = ctx.request.body as AuthReqBody;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { error: "Invalid credentials" };
  }
};

export default login;
