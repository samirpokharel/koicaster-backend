import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";


export default class AuthService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }

  createUser = async (user: Omit<User, "id">): Promise<User> => {
    return await this.prismaClient.user.create({ data: user });
  };
}
