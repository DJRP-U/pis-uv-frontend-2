// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import storage from '../storage/storage'
const ProtectedRoutes = () => {
    const authUser = storage.get('authUser');
    if (!authUser) {
        return <Navigate to='/'/>
    }
    return <Outlet/>
}

export default ProtectedRoutes