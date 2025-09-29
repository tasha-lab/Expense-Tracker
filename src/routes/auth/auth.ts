import { Router } from "express";
import { getUserDetails, login, Signup } from "../../controllers/auth/auth";
import { verify } from "../../middleware/verify";

const AuthRouter = Router();

AuthRouter.post("/signup", Signup);
AuthRouter.get("/login", login);
AuthRouter.get("/details", verify, getUserDetails);

export default AuthRouter;
