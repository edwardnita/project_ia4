import axios from 'axios';
import { API_URL } from '../constants';

const instance = axios.create({
  baseURL: API_URL,
});

export function postSearch(message: string) {
    return instance.post(
      'search',
      {"message": message},
    );
  }
  