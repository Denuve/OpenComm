import { Router } from "express";
import {
  checkInEvent,
  createEvent,
  deleteEvent,
  getEvents,
  joinEvent,
  leaveEvent,
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

router.post("/:id/join", authenticate, joinEvent);
router.post("/:id/leave", authenticate, leaveEvent);
router.post("/:id/checkin", authenticate, checkInEvent);

export default router;
