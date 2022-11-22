import React from 'react'
import { Navigate } from 'react-router-dom'
import { history } from '../history'
import PropTypes from 'prop-types'

export { PrivateRoute };

function PrivateRoute({ children }) {
    
    let token = localStorage.getItem('Auth Token')

    if (!token) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" state={{ from: history.location }} /> 
    }

    // authorized so return child components
    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.any,
};