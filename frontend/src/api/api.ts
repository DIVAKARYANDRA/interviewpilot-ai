export default api;

import axios from "axios";

import { getToken } from "../utils/token";


const api = axios.create({

    baseURL:
    "https://interviewpilot-ai-2cmo.onrender.com"

});



api.interceptors.request.use(

    (config)=>{


        const token = getToken();


        if(token){

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },

    (error)=>{

        return Promise.reject(error);

    }

);



export default api;
