import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
const LoginOAuth2 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('token');
        decoded(queryParam);
        navigate("/home");
        window.location.reload();
    }, [location.search]);
    const decoded = (token) => {
        const decoded = jwtDecode(token);
        const manguoidung = decoded.sub
        const manguoidung1 = parseInt(manguoidung);
        sessionStorage.setItem("userID", manguoidung1);
        sessionStorage.setItem("accessToken", token);

    }
    return (
        <div></div>
    )
}

export default LoginOAuth2