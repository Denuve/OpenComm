import { SocialEvent } from "../types/event";

const API_URL = 'http://192.168.1.83:5000/api';

export const fetchEvents = async (userAge?: number, search?: string): Promise<SocialEvent[]> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
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
    } catch (error: any) {
        if (error.name === 'AbortError') {

            console.error('⏱️ Serverul nu a răspuns în 5 secunde (Timeout)');
        } else {
            console.error('❌ Eroare de rețea / API:', error);
        }
        return [];
    }
}