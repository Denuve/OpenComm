export type UserRole = 'user' | 'volunteer_host' | 'venue_partner' | 'admin';

export interface User {
    id: string;
    email: string;
    name: string;
    age: number;
    gender: string;
    role: UserRole;
    attendedEventsCount: number;
    createdAd?: string;
}

export type RegisterInput = {
    email: string;
    password: string;
    name: string;
    age: number;
    gender: string;
}

export type LoginInput = {
    email: string;
    password: string;
}