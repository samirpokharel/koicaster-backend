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

    router
      .route("/:bannerId/bannerItems")
      .get(protect, bannerController.getAllBanners)
      .post(protect, bannerController.createBannerItem);

    router
      .route("/:bannerId/bannerItems/:bannerItemId")
      .put(protect, bannerController.updateBanner)
      .delete(protect, bannerController.deleteBanner);

    return router;
  }
}
