import Router from "@koa/router";
import { hello } from "../../controllers";

const router = new Router();

router.get("/hello", hello);

export default router;
