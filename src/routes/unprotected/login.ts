import Router from "@koa/router";

import { login } from "../../controllers";

const router = new Router();

router.get("/login", login);

export default router;
