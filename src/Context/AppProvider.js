import axios from 'axios';
import React, {useState, useEffect, createContext} from 'react'
import { baseURL } from '../constants/baseURL'

export const AppContext = createContext();

export const AppProvider = ({children}) => {

    const [userData, setUserData] = useState({});
    const [voucherData, setVoucherData] = useState([]);

    useEffect( () => {
        const userID = sessionStorage.getItem("userID");
        axios.get(`${baseURL}/api/v1/user/${userID}`)
            .then((res) => setUserData(res.data))
            .catch((err) => console.log(err))
        // GET LIST VOUCHER
        axios.get(`${baseURL}/api/v1/voucher`)
            .then((res) => setVoucherData(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <AppContext.Provider value={{ userData , voucherData}}>
            {children}
        </AppContext.Provider>
    )
}