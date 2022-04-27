export type Animal = "dog" | "rabbit" | "cat" | "reptile" | "bird"

export interface Location {
  city: string;
  state: string;
}

export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
  location: Location;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}

