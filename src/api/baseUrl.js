import axios from "axios";
import { API_URL, APII_URL } from "../constants/thunkTypes";

export const API = axios.create({
    baseURL: API_URL,
});


// const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || ""
// console.log(`CustomerId: ${userInfo.customer?.uid}`)

// API.interceptors.request.use(
//     (req) => {
//       if(userInfo) {
//         req.headers['customerId'] = userInfo.customer?.uid;
//       }
      
      
//       return req;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
//   );

