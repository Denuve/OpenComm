import { Request, Response } from "express";
import { CreateEventInput, SocialEvent } from "../models/eventModel";
import { supabase } from "../config/supabase";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("events").select("*");

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching events" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const title = req.body.title;
    const maxParticipants = req.body.maxParticipants ?? req.body.max_participants;
    const targetGender = req.body.targetGender ?? req.body.target_gender;
    const minAge = req.body.minAge ?? req.body.min_age;

    if (!title || !maxParticipants || !targetGender || !minAge) {
      return res.status(400).json({
        succes: false,
        message:
          "Missing required fields: title, maxParticipants, targetGender, minAge",
      });
    }
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          max_participants: maxParticipants,
          target_gender: targetGender,
          min_age: minAge,
          current_participants_count: 1,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(201).json({ succes: true, data: data[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Error creating event" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, maxParticipants, targetGender, minAge } = req.body;

    const payload: Record<string, any> = {};
    if (title !== undefined) payload.title = title;
    if (maxParticipants !== undefined)
      payload.max_participants = maxParticipants;
    if (targetGender !== undefined) payload.target_gender = targetGender;
    if (minAge !== undefined) payload.min_age = minAge;

    const { data, error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Evenimentul nu a fost găsit!" });
    }

    return res.status(200).json({ succes: true, data: data[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Error updating event." });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Evenimentul nu a fost găsit!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Event deleted.", data: data[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting event." });
  }
};
