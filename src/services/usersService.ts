import prisma from "../lib/prisma.js";

export const UserService = {
  async create(user: { name: string; email: string }) {
    // simulating db logic
    return await prisma.user.create({
      data: user,
    });
  },
};
