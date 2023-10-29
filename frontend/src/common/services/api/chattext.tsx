import axios from 'axios';
import { API_URL } from '../constants';
import { IChatRequest } from '../../interfaces/chattext.interface';

const instance = axios.create({
  baseURL: API_URL,
});

export function chatRequest(data : IChatRequest) {
  return instance.post('chat', {"message":data.subject});
}
