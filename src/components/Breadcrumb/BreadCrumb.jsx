import React from 'react'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import {
    Box, Breadcrumbs, Link, Typography
} from '@mui/material'

const BreadCrumb = () => {
  return (
    <Box m={2} style={{padding: 10, marginTop: 50}}>
        <Breadcrumbs
            // maxItems={}
            // itemsBeforeCollapse={2}
            aria-label='breadcrumb'
            separator={<NavigationNexIcon fontSize='small' />}
        >
            <Link underline='hover' href='Home' color={'#F9813A'}>
                Home
            </Link>
            <Link underline='hover' href='foods' color={'#F9813A'}>
                Product
            </Link>
            <Link underline='hover' href='' color={'#F9813A'}>
                Product detail
            </Link>
            <Typography color={"black"}>Case 1st Player Fire Dancing V2-A</Typography>
        </Breadcrumbs>
    </Box>
  )
}

export default BreadCrumb

