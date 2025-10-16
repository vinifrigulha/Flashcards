import bcrypt from "bcryptjs";
import prisma from "../prisma.js";

export const userModel = {
  // Busca usuário por email (para login)
  async findUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  },

  // Cria novo usuário com senha criptografada
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

  // Compara senha plain text com hash
  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Busca usuário por ID (sem retornar senha)
  async findUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true }
    });
  }
};