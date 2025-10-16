import jwt from "jsonwebtoken";
import { userModel } from "../models/authModel.js";

// Define os critérios de segurança para senhas
const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Pelo menos uma letra minúscula');
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Pelo menos uma letra maiúscula');
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Pelo menos um número');
  }
  if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
    errors.push('Pelo menos um caractere especial');
  }

  return errors;
};

// Registro de novo usuário com validação de senha
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se a senha atende aos requisitos de segurança
  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    return res.status(400).json({ 
      error: "Senha fraca", 
      details: passwordErrors 
    });
  }

  try {
    // Verifica se o email já está em uso
    const existing = await userModel.findUserByEmail(email);
    if (existing) return res.status(400).json({ error: "E-mail já cadastrado." });

    const user = await userModel.createUser({ name, email, password });

    // Retorna dados do usuário sem informações sensíveis
    res.json({ 
      message: "Usuário criado com sucesso!", 
      user: { id: user.id, name: user.name, email: user.email } 
    });
    
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor." });
  }
};

// Autenticação de usuário existente
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca usuário pelo email
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Credenciais inválidas." });

    // Valida a senha fornecida
    const valid = await userModel.validatePassword(password, user.password);
    if (!valid) return res.status(400).json({ error: "Credenciais inválidas." });

    // Gera token JWT para autenticação futura
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor." });
  }
};