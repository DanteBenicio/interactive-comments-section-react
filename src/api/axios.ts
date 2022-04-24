import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api-rest-comments.herokuapp.com',
});
