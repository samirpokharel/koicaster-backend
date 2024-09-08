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
  findUser = async (id: string): Promise<User | null> => {
    return await this.prismaClient.user.findUnique({ where: { googleId: id } });
  };
  findOrCreateUser = async (
    email: string,
    firstName: string,
    lastName: string,
    googleId: string
  ): Promise<User> => {
    let user = await this.prismaClient.user.findUnique({
      where: { email },
    });
    if (!user) {
      user = await this.createUser({
        googleId,
        first_name: firstName,
        last_name: lastName,
        email,
      });
    }
    return user;
  };
}
