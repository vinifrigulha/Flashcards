import { PrismaClient } from "@prisma/client";

// Instância única do cliente Prisma para toda a aplicação
// Gerencia a conexão com o banco de dados e fornece acesso aos modelos
const prisma = new PrismaClient();

export default prisma;