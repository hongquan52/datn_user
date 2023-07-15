import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react'
import { baseURL } from '../constants/baseURL'
import { initializeApp } from "firebase/app";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const firebaseConfig = {
        apiKey: "AIzaSyDkIqYefTbKOJ5r5gexI84Fzy4Tf1oQTrE",
        authDomain: "chatapp-839b6.firebaseapp.com",
        databaseURL: "https://chatapp-839b6-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "chatapp-839b6",
        storageBucket: "chatapp-839b6.appspot.com",
        messagingSenderId: "920125762908",
        appId: "1:920125762908:web:effab25f06bc17cecf6599",
        measurementId: "G-C4S6HDSKDE"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const [userData, setUserData] = useState({});
    const [voucherData, setVoucherData] = useState([]);
    const [allProductData, setAllProductData] = useState([]);
    const [cartProductData, setCartProductData] = useState([]);

    useEffect(() => {
        const userID = sessionStorage.getItem("userID");
        const  cartId  = sessionStorage.getItem("cartId")
        axios.get(`${baseURL}/api/v1/user/${userID}`)
            .then((res) => setUserData(res.data))
            .catch((err) => console.log(err))
        // GET LIST VOUCHER
        axios.get(`${baseURL}/api/v1/voucher`)
            .then((res) => setVoucherData(res.data))
            .catch((err) => console.log(err))
        // GET ALL PRODUCT
        axios.get(`${baseURL}/api/v1/product`)
            .then((res) => {

                setAllProductData(res.data);
            })
            .catch((err) => console.log(err))
        // GET VIEW CART
        axios.get(`${baseURL}/api/v1/cart/product?cartId=${cartId}`)
            .then((res) => {
                
                setCartProductData(res.data);
            })
            .catch((err) => {
                console.log("Cart data error: ", err);
            })
    }, [])

    return (
        <AppContext.Provider value={{ userData, voucherData, app, allProductData, cartProductData }}>
            {children}
        </AppContext.Provider>
    )
}