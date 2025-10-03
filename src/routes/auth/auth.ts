import { Router } from "express";
import {
  getUserDetails,
  login,
  Signup,
  updatePrimaryDetails,
} from "../../controllers/auth/auth";
import { verify } from "../../middleware/verify";

const AuthRouter = Router();

AuthRouter.post("/signup", Signup);
AuthRouter.get("/login", login);
AuthRouter.get("/details", verify, getUserDetails);
AuthRouter.patch("/updatedetails", verify, updatePrimaryDetails);

export default AuthRouter;
