import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase";
import { RegisterInput, LoginInput } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name, age, gender }: RegisterInput = req.body;

        if (!email || !password || !name || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory!"
            });
        }

        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "This email is already in use"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    email,
                    password: hashedPassword,
                    name,
                    age,
                    gender
                }
            ])
            .select();

        if (error || !data) {
            return res.status(400).json({
                success: false,
                message: error?.message || 'Eroare la crearea contului'
            });
        }

        const newUser = data[0];

        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
            expiresIn: '7d'
        });

        delete newUser.password;

        return res.status(200).json({
            success: true,
            message: "User registered succesfull!",
            data: { user: newUser, token }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error registering user!"
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginInput = req.body;

        if (!email || !password) {
            return res.status(400).json({
                succcess: false,
                message: "Email and password required"
            });
        };

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '7d'
        });

        delete user.password;

        return res.status(200).json({
            success: true,
            message: "Authentication successfull!",
            data: { user, token }
        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Server error: Failed authentication!",
        })
    };
}