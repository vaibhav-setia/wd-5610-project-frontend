import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_API_BASE;

//const AUTH_URL = `${SERVER_API_URL}/api`;
const AUTH_URL = `http://localhost:3001/api`;

const api = axios.create({ withCredentials: true });


export const login = async (creds) => {
    const response = await api.post(`${AUTH_URL}/login`, creds);
    const user = response.data;
    return user;
   };
   
