import axios from 'axios';

export const api = axios.create({baseURL: process.env.REACT_APP_API_URL});

api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');