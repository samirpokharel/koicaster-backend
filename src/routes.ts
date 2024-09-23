import express, { Router } from "express";
import AuthRouter from "./feature/authentication/auth.router";
import BannerRouter from "./feature/streaming/banner/banner.router";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/auth", AuthRouter.routes);
    router.use("/folders", BannerRouter.routes);
    return router;
  }
}
