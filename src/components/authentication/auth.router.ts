import { Router } from "express";
import AuthController from "./auth.controller.js";

export default class AuthRouter {
  private authController: AuthController;
  constructor(authController: AuthController) {
    this.authController = authController;
  }
  
  getRouter() {
    const router = Router();
    // TODO: Implement
    // router.route("/").get(this.authController.)
  }


}
