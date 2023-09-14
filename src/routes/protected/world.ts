import Router from "@koa/router";
import { world } from "../../controllers";

const router = new Router();

router.get("/world", world);

export default router;
