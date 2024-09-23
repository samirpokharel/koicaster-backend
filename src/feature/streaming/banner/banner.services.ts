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
    return await this.prismaClient.banner.delete({ where: { id: folderId } });
  };
}
