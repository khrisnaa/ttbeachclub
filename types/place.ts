export interface Place {
  id: string;
  name: string;
  description: string;
  capacity: number | null;
  minimumSpend: number | null;
  image_url: string;
}

export interface PlacesData {
  places: Place[];
}
