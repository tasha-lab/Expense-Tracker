import { Router } from "express";
import { verify } from "../middleware/verify";
import {
  createCategory,
  editCategory,
  getAllCategories,
  hardDeleteCategory,
} from "../controllers/categories";

const categoryRouter = Router();

categoryRouter.post("/newCategory", verify, createCategory);
categoryRouter.get("/getCategories", verify, getAllCategories);
categoryRouter.delete("/delete-Category/:id", verify, hardDeleteCategory);
categoryRouter.put("/editCategory/:id", verify, editCategory);

export default categoryRouter;
