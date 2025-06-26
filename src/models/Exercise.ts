export interface Exercise {
  id: number;
  name: string;
  title: string;
  group: string;
  imageUrl: string;
  isPopular?: boolean;
  isNoWeight?: boolean;
  isDoubleSided?: boolean;
}
