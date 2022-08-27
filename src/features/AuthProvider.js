import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { selectUser } from './Reducer.js'

const AuthProvider = ({ children }) => {
    const user = useSelector(selectUser)
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userData")))
    useEffect(() => {

    }, [auth , user])

    return (
        <div>
            {
                 user || auth ? [children] : <Navigate to="/login" />
            }

        </div>
    )
}

export default AuthProvider