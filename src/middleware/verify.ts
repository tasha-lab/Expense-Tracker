import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface userRequest extends Request {
  userId?: string;
}

export const verify = (req: userRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(201).json({
      message: "Access token required, please login",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Please login",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Please login" });
    console.log(error);
    return;
  }
};
