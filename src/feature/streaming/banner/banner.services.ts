import { type Banner, type Banneritem } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../helper/errors";

type BannerWithItems = Banner & {
  items: Banneritem[];
};

export default class BannerService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }

  getAllFolders = async (userId: string): Promise<BannerWithItems[]> => {
    let folders = await this.prismaClient.banner.findMany({
      where: { userId: userId },
      include: { items: true },
    });
    return folders;
  };

  getSingleFolder = async (id: string): Promise<Banner | null> => {
    return await this.prismaClient.banner.findUnique({ where: { id: id } });
  };

  createFolder = async (folder: Omit<Banner, "id">): Promise<Banner> => {
    return await this.prismaClient.banner.create({ data: folder });
  };

  updateFolder = async (
    folder: Omit<Banner, "id">,
    folderId: string
  ): Promise<Banner> => {
    return await this.prismaClient.banner.update({
      where: { id: folderId },
      data: { ...folder },
    });
  };

  deleteFolder = async (folderId: string): Promise<Banner> => {
    if (!folderId) throw AppError.badRequest("Folder not provided");
    const folder = await this.prismaClient.banner.delete({
      where: { id: folderId },
    });
    // Also delete associated banner items
    await this.prismaClient.banneritem.deleteMany({
      where: { bannerId: folder.id },
    });
    return folder;
  };

  getAllBanners = async (bannerId: string): Promise<Banneritem[]> => {
    let folders = await this.prismaClient.banneritem.findMany({
      where: { bannerId: bannerId },
    });
    return folders;
  };

  createBanner = async (
    bannerItem: Omit<Banneritem, "id">
  ): Promise<Banneritem> => {
    return await this.prismaClient.banneritem.create({ data: bannerItem });
  };

  insertMultipleBanner = async (
    items: Omit<Banneritem, "id">
  ): Promise<Banneritem[]> => {
    return await this.prismaClient.banneritem.createManyAndReturn({
      data: items,
      skipDuplicates: true,
    });
  };

  updateBanner = async (
    bannerItem: Omit<Banneritem, "id">,
    bannerItemId: string
  ): Promise<Banneritem> => {
    return await this.prismaClient.banneritem.update({
      where: { id: bannerItemId },
      data: { ...bannerItem },
    });
  };

  deleteBanner = async (bannerItemId: string): Promise<Banneritem> => {
    if (!bannerItemId) throw AppError.badRequest("Banner not provided");
    return await this.prismaClient.banneritem.delete({
      where: { id: bannerItemId },
    });
  };
}
