import { Router } from "express";
import BannerController from "./banner.controller";
import { protect } from "../../../middleware/auth";

export default class BannerRouter {
  static get routes(): Router {
    const router = Router();
    const bannerController = new BannerController();

    router
      .route("/")
      .get(protect, bannerController.getALlFolders)
      .post(protect, bannerController.createFolder);
    router
      .route("/:id")
      .put(protect, bannerController.updateFolder)
      .delete(protect, bannerController.deleteFolder);
    return router;
  }
}
