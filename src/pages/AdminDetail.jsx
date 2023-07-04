import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'

import { Box, CircularProgress } from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import {getProduct} from '../api/fetchers/product'
import { thunkProductTypes} from "../constants/thunkTypes";

const AdminDetail = () => {
    return (
        <Helmet title='Admin detail'>
            <div><h2>Admin detail</h2>
                
            </div>
        </Helmet>
    )
}

export default AdminDetail