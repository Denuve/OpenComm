import { Request, Response } from "express";

export const getEvents = (req: Request, res: Response) => {
  try {
    const events = [
      {
        id: "e101",
        title: "Seară de Board Games",
        maxParticipants: 6,
        currentParticipantsCount: 3,
      },
      {
        id: "e102",
        title: "Meci de Tenis de Masă",
        maxParticipants: 4,
        currentParticipantsCount: 2,
      },
    ];
    return res.status(200).json({ succes: true, data: events });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching events" });
  }
};
