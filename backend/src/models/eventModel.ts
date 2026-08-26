export type EventStatus = 'DRAFT' | 'PENDING_VENUE' | 'CONFIRMED' | 'CANCELLED';
export type EventType = 'casual' | 'partner';
export type GenderFilter = 'mixed' | 'same_sex' | 'female_only' | 'male_only';

export interface SocialEvent {
    id: string;
    hostId: string;
    venueId?: string | null;
    title: string;
    maxParticipants: number;
    currentParticipantsCount: number;
    targetGender: GenderFilter;
    minAge: number;
    eventType: EventType;
    status: EventStatus;
}

export type CreateEventInput = Omit<SocialEvent, 'id' | 'currentParticipantsCount' | 'status'>;