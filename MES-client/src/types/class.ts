export interface ClassDetails {
  whatToBring: string[];
  whatWeProvide: string[];
  instructorCertifications: string[];
  priceNote: string;
}

export interface ClassInfo {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  instructor: string;
  instructorBio: string;
  instructorImage: string;
  level: string;
  duration: string;
  location: string;
  dates: string[];
  price: number;
  capacity: number;
  spotsLeft: number;
  skillsCovered: string[];
  details: ClassDetails;
}
