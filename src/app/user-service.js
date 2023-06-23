import axios from "axios";


const AUTH_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api`;

const api = axios.create({ withCredentials: true });


export const login = async (creds) => {
    const response = await api.post(`${AUTH_URL}/login`, creds);
    const user = response.data;
    return user;
   };
   
