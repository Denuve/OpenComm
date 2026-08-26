export interface User {
    id: string;
    email: string;
    password?: string;
    name: string;
    age: number;
    gender: string;
    isVolunteerHost: boolean;
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