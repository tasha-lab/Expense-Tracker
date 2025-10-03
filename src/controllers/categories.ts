import { Request, Response } from "express";
import client from "../lib/prisma";

interface userRequest extends Request {
  userId?: string;
}

export const createCategory = async (req: userRequest, res: Response) => {
  try {
    const id = req.userId;

    if (!id) {
      res.status(401).json({
        message: "please login to create a category",
      });
      return;
    }

    const { name } = req.body;
    const category = await client.category.create({
      data: { name, userId: id },
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
    return;
  }
};
export const getAllCategories = async (req: userRequest, res: Response) => {
  try {
    const id = req.userId;
    if (!id) {
      res.status(401).json({
        message: "Please login",
      });
      return;
    }

    const category = await client.category.findMany({
      where: { userId: id },
    });
    res.status(202).json({
      message: "categories gotten successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
    return;
  }
};
export const hardDeleteCategory = async (req: userRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        message: "Can't delete category,Please login",
      });
      return;
    }
    if (!id) {
      res.status(400).json({
        message: "No category",
      });
      return;
    }
    const category = await client.category.findUnique({
      where: { categoryId: id },
    });

    if (category?.userId !== userId) {
      res.status(403).json({
        message: "You can't delete this category",
      });
      return;
    }
    await client.category.delete({
      where: { categoryId: id },
    });
    res.status(200).json({
      message: "Category Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
    return;
  }
};
export const editCategory = async (req: userRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        message: "Please login in",
      });
      return;
    }

    if (!id) {
      res.status(401).json({
        message: "category id is needed",
      });
    }

    const categoryId = id as string;
    const { name } = req.body;

    const existingCategory = await client.category.findUnique({
      where: { categoryId },
    });
    if (!existingCategory) {
      res.status(200).json({
        message: "Theres no category",
      }); 
      return;
    }

    if (existingCategory?.userId !== userId) {
      res.status(403).json({
        message: "You can't delete this category",
      });
      return;
    }

    const newcategory = await client.category.update({
      where: { categoryId },
      data: {
        name,
      },
    });

    res.status(200).json({
      message: "category edited successfully",
      newcategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
    return;
  }
};
