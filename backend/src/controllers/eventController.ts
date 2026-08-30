import { Response } from "express";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { CreateEventInput } from "../models/eventModel";

export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { targetGender, eventType, minAge, search, limit, page } = req.query;

    let query = supabase
      .from("events")
      .select("*, users!events_host_id_fkey(id, email, role)")
      .eq("status", "CONFIRMED")
      .order("created_at", { ascending: false });

    if (targetGender) {
      query = query.eq("targetGender", targetGender as string);
    }
    if (eventType) {
      query = query.eq("eventType", eventType as string);
    }

    if (minAge) {
      const ageNum = parseInt(minAge as string, 10);
      if (!isNaN(ageNum)) {
        query = query.lte("min_age", ageNum);
      }
    }

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const pageSize = limit ? parseInt(limit as string, 10) : 10;
    const pageNum = page ? parseInt(page as string, 10) : 1;
    const from = (pageNum - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      page: pageNum,
      pageSize,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Error fetching events:${error.message}`,
    });
  }
};

export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Requires authentication!" });
    }

    const { userId, role } = req.user;
    const body: CreateEventInput = req.body;

    // 1. Validare câmpuri obligatorii
    if (
      !body.title ||
      !body.maxParticipants ||
      !body.targetGender ||
      !body.minAge ||
      !body.eventType
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Toate câmpurile (title, maxParticipants, targetGender, minAge, eventType) sunt obligatorii!",
      });
    }

    // 2. Limita de grupuri mici (3-6 persoane) pentru utilizatori obișnuiți
    if (
      role !== "venue_partner" &&
      role !== "admin" &&
      (body.maxParticipants < 3 || body.maxParticipants > 6)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Pentru grupuri obișnuite, numărul de participanți trebuie să fie între 3 și 6!",
      });
    }

    // 3. Verificarea numărului de participări anterioare (pentru role === 'user')
    if (role === "user") {
      const { data: dbUser, error: userError } = await supabase
        .from("users")
        .select("attended_events_count")
        .eq("id", userId)
        .maybeSingle();

      if (userError || !dbUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (dbUser.attended_events_count < 2) {
        return res.status(403).json({
          success: false,
          message:
            "You need at least 2 event attendings in order to create event",
        });
      }
    }

    // 4. Inserarea evenimentului în tabela 'events' cu toate câmpurile
    const { data: newEvent, error: insertError } = await supabase
      .from("events")
      .insert([
        {
          host_id: userId,
          venue_id: body.venueId || null,
          title: body.title,
          max_participants: body.maxParticipants,
          current_participants_count: 1,
          target_gender: body.targetGender,
          min_age: body.minAge,
          event_type: body.eventType,
          status: "CONFIRMED",
        },
      ])
      .select()
      .single();

    if (insertError) {
      return res
        .status(400)
        .json({ success: false, message: insertError.message });
    }

    // 5. Adăugarea automată a creatorului în tabela pivot 'event_participants'
    const { error: insertParticipantError } = await supabase
      .from("event_participants")
      .insert([
        {
          event_id: newEvent.id,
          user_id: userId,
          status: "CONFIRMED",
        },
      ]);

    if (insertParticipantError) {
      await supabase.from("events").delete().eq("id", newEvent.id);
      return res.status(500).json({
        success: false,
        message: `Eroare la asocierea utilizatorului:${insertParticipantError.message}`,
      });
    }

    return res.status(201).json({ success: true, data: newEvent });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Neautentificat!" });
    }

    const { id } = req.params; // ID-ul evenimentului extras din URL
    const { userId, role } = req.user;
    const body: Partial<CreateEventInput> = req.body;

    // A. Căutăm evenimentul în baza de date pentru a verifica proprietarul
    const { data: existingEvent, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Evenimentul nu a fost găsit!" });
    }

    // B. Verificare permisiune: doar Host-ul original sau Admin-ul pot edita!
    if (existingEvent.host_id !== userId && role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Acces interzis! Nu poți edita un eveniment creat de altcineva.",
      });
    }

    // C. Validăm numărul de participanți dacă clientul dorește să-l modifice
    if (body.maxParticipants) {
      if (
        role !== "venue_partner" &&
        role !== "admin" &&
        (body.maxParticipants < 3 || body.maxParticipants > 6)
      ) {
        return res.status(400).json({
          success: false,
          message: "Numărul de participanți trebuie să fie între 3 și 6!",
        });
      }

      if (body.maxParticipants < existingEvent.current_participants_count) {
        return res.status(400).json({
          success: false,
          message:
            "Nu poți seta o capacitate mai mică decât numărul actual de oameni deja înscriși!",
        });
      }
    }

    // D. Executăm update-ul în Supabase
    const { data: updatedEvent, error: updateError } = await supabase
      .from("events")
      .update({
        title: body.title || existingEvent.title,
        max_participants:
          body.maxParticipants || existingEvent.max_participants,
        target_gender: body.targetGender || existingEvent.target_gender,
        min_age: body.minAge || existingEvent.min_age,
        event_type: body.eventType || existingEvent.event_type,
        venue_id:
          body.venueId !== undefined ? body.venueId : existingEvent.venue_id,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return res
        .status(400)
        .json({ success: false, message: updateError.message });
    }

    return res.status(200).json({ success: true, data: updatedEvent });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. DELETE /api/events/:id - Ștergerea unui eveniment (Doar Host sau Admin)
export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Neautentificat!" });
    }

    const { id } = req.params;
    const { userId, role } = req.user;

    // A. Căutăm evenimentul în baza de date
    const { data: existingEvent, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Evenimentul nu a fost găsit!" });
    }

    // B. Verificare permisiune: doar Host-ul original sau Admin-ul pot șterge!
    if (existingEvent.host_id !== userId && role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Acces interzis! Nu poți șterge un eveniment creat de altcineva.",
      });
    }

    // C. Ștergem evenimentul din Supabase
    const { error: deleteError } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return res
        .status(400)
        .json({ success: false, message: deleteError.message });
    }

    return res.status(200).json({
      success: true,
      message: "Evenimentul a fost șters cu succes!",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const joinEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!",
      });
    }

    const { id } = req.params;
    const { userId } = req.user;

    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (event.status !== "CONFIRMED" || event.status === "FINISHED") {
      return res.status(400).json({
        success: false,
        message: "Event finished or not available",
      });
    }

    if (event.current_participants_count >= event.max_participants) {
      return res.status(400).json({
        success: false,
        message: "Event is full.",
      });
    }

    const { data: existingParticipant } = await supabase
      .from("event_participants")
      .select("*")
      .eq("event_id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingParticipant) {
      return res
        .status(400)
        .json({ success: false, message: "Already joined this event." });
    }

    const { error: joinError } = await supabase
      .from("event_participants")
      .insert([{ event_id: id, user_id: userId, status: "CONFIRMED" }]);

    if (joinError) {
      return res.status(400).json({
        success: false,
        message: joinError.message,
      });
    }

    const { data: updatedEvent, error: updateError } = await supabase
      .from("events")
      .update({
        current_participants_count: event.current_participants_count + 1,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return res
        .status(500)
        .json({ success: false, message: updateError.message });
    }

    return res.status(200).json({
      success: true,
      message: "Joined the event successfully!",
      data: updateEvent,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const leaveEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        succes: false,
        message: "Not authenticated!",
      });
    }

    const { id } = req.params;
    const { userId } = req.user;

    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found!" });
    }

    if (event.host_id === userId) {
      return res.status(400).json({
        success: false,
        message:
          "Organizatorul nu poate părăsi evenimentul! Folosește opțiunea de ștergere.",
      });
    }

    const { data: participant } = await supabase
      .from("event_participants")
      .select("*")
      .eq("event_id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (!participant) {
      return res.status(400).json({
        success: false,
        message: "Nu ești înscris la acest eveniment!",
      });
    }

    const { error: deleteError } = await supabase
      .from("event_participants")
      .delete()
      .eq("event_id", id)
      .eq("user_id", userId);

    if (deleteError) {
      return res
        .status(400)
        .json({ success: false, message: deleteError.message });
    }

    const { data: updatedEvent, error: updateError } = await supabase
      .from("events")
      .update({
        current_participants_count: Math.max(
          1,
          event.current_participants_count - 1,
        ),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return res
        .status(500)
        .json({ success: false, message: updateError.message });
    }

    return res.status(200).json({
      success: true,
      message: "Ai părăsit evenimentul!",
      data: updatedEvent,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
