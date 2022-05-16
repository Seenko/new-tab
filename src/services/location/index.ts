import type { LocationSearchRequest } from '@/services/location/types/LocationSearchRequest';
import type { LocationSearchResponse } from '@/services/location/types/LocationSearchResponse';

import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.PUBLIC_LOCATION_API_ENDPOINT as string;
const BASE_TOKEN = import.meta.env.PUBLIC_LOCATION_API_TOKEN as string;

let instance: AxiosInstance;

const LocationService = {
  init: (token?: string) => {
    instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      params: {
        'key':  token ? token : BASE_TOKEN
      }
    });
  },
  getAutocomplete: (request: LocationSearchRequest, abortController?: AbortController): Promise<LocationSearchResponse> => {
    return instance.get('/autocomplete.php',
      {
        signal: abortController?.signal,
        params: {
          q: request.q,
          limit: request.limit,
          viewbox: request.viewbox ? request.viewbox.join(',') : null,
          bounded: request.bounded ? 1 : 0,
          countrycodes: request.countrycodes ? request.countrycodes.join(',') : null,
          json_callback: request.json_callback,
          normalizecity: request.normalizecity ? 1 : 0,
          'accept-language': request['accept-language'] ? request['accept-language'].join(',') : null,
          tag: request.tag ? request.tag.join(',') : null,
          dedupe: request.dedupe ? 1 : 0,
          importancesort: request.importancesort ? 1 : 0
        }
      }).then(response => response.data, error => { if (error.constructor.name === 'Cancel') return; });
  }
};

export default LocationService;