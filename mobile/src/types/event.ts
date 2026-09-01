export type GenderFilter = 'mixed' | 'same_sex' | 'female_only' | 'male_only';
export type EventType = 'casual' | 'hosted' | 'partner'

export interface SocialEvent {
    id: string;
    host_id: string;
    title: string;
    max_participants: number;
    current_participants_count: number;
    target_gender: GenderFilter;
    min_age?: number;
    max_age?: number;
    event_type: EventType;
    status: string;
    users?: {
        id: string;
        email: string;
        role: string;
    };
}