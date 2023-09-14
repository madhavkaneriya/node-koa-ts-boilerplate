import Router from "@koa/router";

import { ready, live } from "../../controllers";

const router = new Router();

router.get("/.well-known/live", live);
router.get("/.well-known/ready", ready);

export default router;
