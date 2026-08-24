import { Request, Response } from "express";
import { CreateEventInput, SocialEvent } from "../models/eventModel";

const eventsDb: SocialEvent[] = [
  {
    id: "e101",
    title: "Seară de Board Games",
    maxParticipants: 6,
    currentParticipants: 0,
    currentParticipantsCount: 3,
    targetGender: "mixed",
    minAge: 18,
  },
];

export const getEvents = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ succes: true, data: eventsDb });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching events" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const body: CreateEventInput = req.body;

    if (
      !body.title ||
      !body.maxParticipants ||
      !body.targetGender ||
      !body.minAge
    ) {
      return res.status(400).json({
        succes: false,
        message:
          "Missing required fields: title, maxParticipants, targetGender, minAge",
      });
    }
    const newEvent: SocialEvent = {
      id: `e-${Date.now()}`,
      title: body.title,
      maxParticipants: body.maxParticipants,
      currentParticipantsCount: 1,
      currentParticipants: 0,
      targetGender: body.targetGender,
      minAge: body.minAge,
    };
    eventsDb.push(newEvent);
    return res.status(201).json({
      succes: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Error creating event" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const eventIndex = eventsDb.findIndex((event) => id === event.id);
    if (eventIndex === -1) {
      return res
        .status(404)
        .json({ succes: false, message: "Event not found" });
    }

    eventsDb[eventIndex] = {
      ...eventsDb[eventIndex],
      ...body,
      id,
    };
    return res.status(200).json({ succes: true, data: eventsDb[eventIndex] });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Error updating event." });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = eventsDb.findIndex((event) => event.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found." });
    }

    const deletedEvent = eventsDb.splice(index, 1)[0];

    return res.status(200).json({
      succes: true,
      message: "Event deleted.",
      data: deletedEvent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting event." });
  }
};
