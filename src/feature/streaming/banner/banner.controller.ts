import { type Request, type Response, type NextFunction } from "express";
import BannerService from "./banner.services";
import asyncHandler from "../../../middleware/async";
import * as yup from "yup";
import { AppError } from "../../../helper/errors";
import { happyResponse  } from "../../../helper/happy-response";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      googleId: string | null;
      first_name: string;
      last_name: string;
    }
  }
}

const folderSchema = yup.object({
  name: yup.string().required("Folder name is required"),
});

export default class BannerController {
  readonly bannerService: BannerService;

  constructor() {
    this.bannerService = new BannerService();
  }

  getALlFolders = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      const folders = await this.bannerService.getAllFolders(req.user!.id);
      res.status(200).send(happyResponse(folders));
    }
  );

  createFolder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await folderSchema.validate(req.body);
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      req.body.userId = req.user?.id;
      const folder = await this.bannerService.createFolder(req.body);
      res.status(200).send(happyResponse(folder));
    }
  );

  updateFolder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      await folderSchema.validate(req.body);

      if (!req.params.id) throw AppError.badRequest("Folder ID is required");

      let folder = await this.bannerService.getSingleFolder(req.params.id);
      if (!folder) throw AppError.notFound("Folder not found");
      if (folder.userId !== req.user?.id)
        throw AppError.unauthorized(
          "You are not authorized to perform operation on this"
        );
      folder = await this.bannerService.updateFolder(req.body, req.params.id);

      res.status(200).send(happyResponse(folder));
    }
  );

  deleteFolder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await folderSchema.validate(req.body);

      if (!req.params.id) throw AppError.badRequest("Folder ID is required");

      let folder = await this.bannerService.getSingleFolder(req.params.id);
      if (!folder) throw AppError.notFound("Folder not found");
      if (folder.userId !== req.user?.id)
        throw AppError.unauthorized(
          "You are not authorized to perform operation on this"
        );
      folder = await this.bannerService.deleteFolder(req.params.id);

      res.status(200).send(happyResponse(folder));
    }
  );
}
