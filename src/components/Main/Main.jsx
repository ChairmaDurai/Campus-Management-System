import React from 'react'
import { Routes, Route } from "react-router-dom"
import User from '../../pages/Login/User'
import Home from '../../pages/Others/Home'
import ListCampus from '../Campus/List/ListCampus'


const Main = () => {
  return (
    <Routes>
      <Route path='/' >
        <Route index element={<User />} />
        <Route path="home">
          <Route index element={<Home />} />
          <Route path="campus" element={<ListCampus />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Main