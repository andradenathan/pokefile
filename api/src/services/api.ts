import axios from "axios";
import 'dotenv/config';

const api = axios.create({baseURL: process.env.POKEAPI_URL});

export default api;