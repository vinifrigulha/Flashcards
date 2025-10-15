import bcrypt from "bcryptjs";
import prisma from "../prisma.js";

export const userModel = {
  async findUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
  },

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  async findUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true }
    });
  }
};