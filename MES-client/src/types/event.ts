export interface EventDetails {
  whatToBring: string[];
  refundPolicy: string;
  parkingInfo: string;
  transportation: string;
}

export interface EventInfo {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  locationDetails: string;
  capacity: number;
  spotsLeft: number;
  price: number;
  type: string;
  tags: string[];
  organizer: string;
  contactEmail: string;
  highlights: string[];
  details: EventDetails;
}
