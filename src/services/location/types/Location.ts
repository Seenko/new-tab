import type { AddressDetails } from '@/services/location/types/AddressDetails';

export interface Location {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: number;
  lon: number;
  display_place: string;
  display_address: string;
  display_name: string;
  class: string;
  type: string;
  icon: string;
  address?: AddressDetails;
}