import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// Public
router.get("/", getEvents);

// Authenticated
router.post("/", authenticate, createEvent);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);
export default router;
