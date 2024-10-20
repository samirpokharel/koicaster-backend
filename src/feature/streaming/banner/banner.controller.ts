import { type Request, type Response, type NextFunction } from "express";
import BannerService from "./banner.services";
import asyncHandler from "../../../middleware/async";
import * as yup from "yup";
import { AppError } from "../../../helper/errors";
import { happyResponse } from "../../../helper/happy-response";

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

const folderSchema = yup
  .object({
    name: yup.string().required("Folder name is required"),
    items: yup.array(),
  })
  .noUnknown(true)
  .required();

const bannerSchema = yup
  .object({
    content: yup.string().required("banner content is required"),
  })
  .noUnknown(true)
  .required();

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

  getAllBanners = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      const bannersItems = await this.bannerService.getAllBanners(
        req.params.bannerId
      );
      res.status(200).send(happyResponse(bannersItems));
    }
  );

  createBannerItem = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await bannerSchema.validate(req.body, {
        strict: true,
        stripUnknown: false,
      });
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      req.body.bannerId = req.params.bannerId;
      delete req.body.id;
      const banner = await this.bannerService.createBanner(req.body);
      res.status(200).send(happyResponse(banner));
    }
  );

  updateBanner = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      await bannerSchema.validate(req.body, {
        strict: true,
        stripUnknown: false,
      });

      if (!req.params.bannerId)
        throw AppError.badRequest("folder Id is required");

      if (!req.params.bannerItemId)
        throw AppError.badRequest("banner item Id is required");

      const folder = await this.bannerService.getSingleFolder(
        req.params.bannerId
      );
      if (!folder) throw AppError.notFound("Folder not found");
      if (folder.userId !== req.user?.id)
        throw AppError.unauthorized(
          "You are not authorized to perform operation on this"
        );
      let banner = await this.bannerService.updateBanner(
        req.body,
        req.params.bannerItemId
      );

      res.status(200).send(happyResponse(banner));
    }
  );

  deleteBanner = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (!req.params.bannerId)
        throw AppError.badRequest("folder Id is required");

      if (!req.params.bannerItemId)
        throw AppError.badRequest("banner item Id is required");

      const folder = await this.bannerService.getSingleFolder(
        req.params.bannerId
      );
      if (!folder) throw AppError.notFound("Folder not found");
      if (folder.userId !== req.user?.id)
        throw AppError.unauthorized(
          "You are not authorized to perform operation on this"
        );
      const banner = await this.bannerService.deleteBanner(
        req.params.bannerItemId
      );

      res.status(200).send(happyResponse(banner));
    }
  );

  createFolder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await folderSchema.validate(req.body, { stripUnknown: false });
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      req.body.userId = req.user?.id;
      const requestBodyCopy = { ...req.body };
      let response;
      delete requestBodyCopy.id;
      delete requestBodyCopy.items;
      const folder = await this.bannerService.createFolder(requestBodyCopy);


      // it's used for dublicate folder. when supplied with items.
      if (req.body.items) {
        const modifiedItems = req.body.items.map((item: any) => {
          const { id, ...rest } = item;
          return { ...rest, bannerId: folder.id };
        });
        const items = await this.bannerService.insertMultipleBanner(
          modifiedItems
        );
        console.log(items);
        response = { ...folder, items };
      }

      res.status(200).send(happyResponse(response));
    }
  );

  updateFolder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) throw AppError.forbidden("Unauthenticated");
      await folderSchema.validate(req.body, {
        strict: true,
        stripUnknown: true,
      });

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
