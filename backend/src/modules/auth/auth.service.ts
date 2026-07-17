import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export class AuthService {
  static async register(
    name: string,
    email: string,
    password: string
  ) {
    name = name.trim();
    email = email.trim().toLowerCase();

    if (name.length < 3 || name.length > 40) {
      throw new Error(
        "Name must be between 3 and 40 characters."
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new Error(
        "Please enter a valid email address."
      );
    }

    if (!PASSWORD_REGEX.test(password)) {
      throw new Error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      throw new Error("User already exists.");
    }

    const hashed = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true },
    });
  }

  static async login(email: string, password: string) {
    email = email.trim().toLowerCase();

      if (!EMAIL_REGEX.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (!password.trim()) {
        throw new Error("Password is required.");
      }
      
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };
  }

  static async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
  }

 
  static async listUsers() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }
  static async updateProfile(userId: string, name: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { name },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

static async changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!valid) {
    throw new Error("Current password is incorrect");
  }
  
  if (!PASSWORD_REGEX.test(newPassword)) {
  throw new Error(
    "New password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."
  );
}
  const hashed = await bcrypt.hash(
    newPassword,
    10
  );

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashed,
    },
  });

  return {
    message: "Password updated successfully",
   };
  }
}