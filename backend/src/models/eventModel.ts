export type GenderFilter = 'mixed' | 'same_sex' | 'female_only' | 'male_only';

export interface SocialEvent {
    id: string;
    title: string;
    maxParticipants: number;
    currentParticipants: number;
    targetGender: GenderFilter;
    minAge: number;
}

export type CreateEventInput = Omit<SocialEvent, 'id' | 'currentParticipants'>;