import React, { useState } from 'react'
import "./user.scss"
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const User = () => {
  const [user , setUser] = useState(false)
  return (
    <div className='user'>
      <div className="center">
        {
          user ? 
          <Login user={user} setUser={setUser} /> : <Signup user={user} setUser={setUser} />
        }

      <Button to={""} onClick={()=>{
        setUser(!user)
      }} >{ user ? "New User!" : "Already a User?"}</Button>
        
      </div>
    </div>
  )
}

export default User