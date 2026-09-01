import { SocialEvent } from "../types/event";

const API_URL = 'http://10.0.2.2:5000/api';

export const fetchEvents = async (userAge?: number, search?: string): Promise<SocialEvent[]> => {
    try {
        let url = `${API_URL}/events?`
        if (userAge) url += `userAge=${userAge}`;
        if (search) url += `search=${encodeURIComponent(search)}&`;

        const response = await fetch(url);
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Fetch events error.');
        }

        return result.data;
    } catch (error) {
        console.log('API Error:', error);
        return [];
    }
}