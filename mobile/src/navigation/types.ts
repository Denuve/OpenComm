import { SocialEvent } from '../types/event';

export type RootStackParamList = {
    Feed: undefined;

    EventDetails: {
        event: SocialEvent;
    };
};