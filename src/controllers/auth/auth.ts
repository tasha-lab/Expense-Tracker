import { Request, Response } from "express";
import client from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface userRequest extends Request {
  userId?: string;
}
export const Signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (existingUser) {
      res.status(403).json({
        message: "user already exist",
      });
      return;
    }

    const hashedPass = await bcrypt.hash(password, 10);
    await client.user.create({
      data: { firstName, lastName, email, username, password: hashedPass },
    });
    res.status(201).json({
      message: "User Created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const user = await client.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (!user) {
      res.status(400).json({
        message: "invalid login details",
      });
      return;
    }

    const correctPassword = await bcrypt.compare(password, user?.password);

    if (!correctPassword) {
      res.status(400).json({
        message: "Incorrect password",
      });
      return;
    }

    const { userId, password: _, dateCreated, ...rest } = user;

    const token = jwt.sign(
      {
        userId: user.userId,
        firstname: user.firstName,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h",
      }
    );
    res.status(202).json({
      message: "Login successful",
      token,
      userId,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
    return;
  }
};

export const getUserDetails = async (req: userRequest, res: Response) => {
  try {
    const id = req.userId;

    if (!id) {
      res.status(400).json({
        message: "Cant get details,please login",
      });
      return;
    }
    const user = await client.user.findFirst({
      where: {
        userId: id,
      },
    });
    res.status(200).json({
      message: "Your details have been retrieved successfully",
      user,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
    return;
  }
};

export const updatePrimaryDetails = async (req: userRequest, res: Response) => {
  try {
    const id = req.userId;

    if (!id) {
      res.status(400).json({
        message: "can't edit details, please login",
      });
      return;
    }

    const { firstName, lastName, username } = req.body;

    const details = await client.user.update({
      where: { userId: id },
      data: {
        firstName,
        lastName,
        username,
      },
    });
    res.status(200).json({
      message: "Details edited successfully",
      details,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
    return;
  }
};
