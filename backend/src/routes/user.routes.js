import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
const router = Router();

router.route('/regiser').post(registerUser);
router.route('/login').post(loginUser);



export default router;