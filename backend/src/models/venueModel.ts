export interface Venue {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  ownerId?: string | null;
  isPartner: boolean;
}