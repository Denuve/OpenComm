import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';
import { User } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const register = async (req: Request, res: Response) => {
  try {
    // Preluăm câmpurile flexibil (acceptăm name/fullName și age/birthDate)
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;

    if (!email || !password || !name || !gender || !age) {
      return res.status(400).json({
        success: false,
        message: 'Toate câmpurile (email, password, name/fullName, gender) sunt obligatorii!'
      });
    }

    // 1. Verificăm dacă e-mailul există deja (folosind maybeSingle)
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Acest e-mail este deja utilizat!'
      });
    }

    // 2. Hașurăm parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Inserăm în Supabase (Mapăm câmpurile pe structura reală a tabelei)
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: email.toLowerCase().trim(),
          password: hashedPassword, // Sau 'password' în funcție de coloana din Supabase
          name: name,
          gender: gender,
          age: age,
          role: 'user',
          attended_events_count: 0
        }
      ])
      .select('id, email, name, gender, role, attended_events_count, age')
      .single();

    if (error || !data) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Eroare la crearea contului în Supabase!'
      });
    }

    // 4. Construim obiectul User
    const newUser: User = {
      id: data.id,
      email: data.email,
      name: data.name,
      age: age || 20,
      gender: data.gender,
      role: data.role,
      attendedEventsCount: data.attended_events_count
    };

    // 5. Generăm token-ul JWT (include rolul pentru middleware-urile de securitate)
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Utilizator înregistrat cu succes!',
      data: { user: newUser, token }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Eroare de server la înregistrare!'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'E-mailul și parola sunt obligatorii!'
      });
    }

    // Căutăm utilizatorul în Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'E-mail sau parolă incorectă!'
      });
    }

    // Verificăm parola (suportă atât coloana password_hash cât și password)
    const storedHash = user.password_hash || user.password;
    const isPasswordValid = await bcrypt.compare(password, storedHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'E-mail sau parolă incorectă!'
      });
    }

    // Generăm Token-ul JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userProfile: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age || 20,
      gender: user.gender,
      role: user.role,
      attendedEventsCount: user.attended_events_count || 0
    };

    return res.status(200).json({
      success: true,
      message: 'Autentificare reușită!',
      data: { userProfile, token }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false, // Corectat din true în false
      message: error.message || 'Eroare de server la autentificare!'
    });
  }
};