import { Router } from "express";
import { UsersRoutes } from "./users-routes";

const router: Router = Router();

router.use("/", UsersRoutes);

export const MainRouter: Router = router;
