import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/userModel';

// Interface pentru structura cifrată în token-ul JWT
export interface JwtPayload {
  userId: string;
  role: UserRole;
  email?: string;
  iat?: number;
  exp?: number;
}

// Extinderea interfeței Request de la Express pentru a stoca datele decodificate
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * 1. Middleware de Autentificare
 * Extrage și validează token-ul JWT din header-ul 'Authorization: Bearer <token>'
 */
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // A. Verificare existență header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Acces interzis: Lipseste header-ul Authorization!'
      });
    }

    // B. Verificare schemă Bearer strictă
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        message: 'Format token invalid! Formatul corect este: Bearer <token>'
      });
    }

    const token = parts[1];

    // C. Verificare și decodificare cryptografică a token-ului
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // D. Inspecție suplimentară de securitate a payload-ului
    if (!decoded || !decoded.userId || !decoded.role) {
      return res.status(401).json({
        success: false,
        message: 'Token invalid: Payload incomplet sau alterat!'
      });
    }

    // E. Freeze pe obiectul req.user pentru a preveni modificarea accidentală/rău-intentionată în controllere
    req.user = Object.freeze({
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email
    });

    return next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Sesiunea a expirat! Te rugăm să te autentifici din nou.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalid sau semnatura compromisă!'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Eroare internă la procesarea autentificării!'
    });
  }
};

/**
 * 2. Middleware de Autorizare (RBAC)
 * Verifică dacă rolul utilizatorului autentificat se află în lista de roluri permise
 */
export const checkRole = (allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Verificare dacă middleware-ul 'authenticate' a rulat anterior
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Neautentificat: Lipsește profilul de utilizator din cerere!'
      });
    }

    // Verificare permisiuni pe bază de rol
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Acces interzis: Nu ai permisiunile necesare pentru a executa această acțiune!'
      });
    }

    return next();
  };
};