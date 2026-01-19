import axios from "axios";
import { SERVER_URL, SERVER_URL_V2 } from "../config";


const axiosInstance = axios.create({baseURL: SERVER_URL});

export const axiosInstanceV2 = axios.create({baseURL: SERVER_URL_V2});


export default axiosInstance;