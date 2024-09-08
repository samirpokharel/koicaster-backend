import { Router } from "express";

import AuthController from "./auth.controller";

export default class AuthRouter {
  static get routes(): Router {
    const router = Router();
    const authController = new AuthController();

    router.get("/google", authController.googleLogin);
    router.get("/me",authController.me)
    router.get("/google/callback", authController.googleCallback);
    router.get("/logout", authController.logout);
    return router;
  }
}
