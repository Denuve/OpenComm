import { Router, Response } from "express";
import {
  authenticate,
  checkRole,
  AuthenticatedRequest,
} from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticate);
router.use(checkRole(["admin"]));

router.get("/dashboard", (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    message: "Access granted! Welcome to Admin Dashboard!",
  });
});

export default router;
