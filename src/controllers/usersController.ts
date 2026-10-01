import type { NextFunction, Request, Response } from "express";
import { isValidEmail } from "../utils/validator.js";
import { UserService } from "../services/usersService.js";

export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email } = req.body;

  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ error: "email is invalid" });
    return;
  }

  try {
    const user = await UserService.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "user creation failed" });
  }
}
