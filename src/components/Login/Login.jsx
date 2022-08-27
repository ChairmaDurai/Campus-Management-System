import React, { useEffect,  } from 'react'
import "./login.scss"
import { Button, FormGroup, InputLabel, TextField } from "@mui/material"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {  loginFailure, loginStart, loginSuccess } from '../../features/Reducer'

const Login = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state)=> state.currentUser)
  useEffect(()=>{

  },[currentUser,dispatch])
  const url = process.env.REACT_APP_URL
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required").email("Enter Valid Email").strict(),
      password: Yup.string().required("Required").min(8, "Min 8 Character").trim("No spaces allowed"),
    }),
    onSubmit: async (values) => {
      dispatch(loginStart())
      try {
        const res = await axios.post(`${url}/users/login`, values)
        dispatch(loginSuccess(res.data))
        navigate("/campus")
      } catch (err) {
        dispatch(loginFailure())
        alert(JSON.stringify(err.response.data))
      }

    }
  })

  return (
    <div className='login'>
      <div className="center">
        <h3>Login</h3>
        <form>
          <FormGroup className='form-group'>
            <InputLabel className='label' htmlFor="email"  >
              Email
            </InputLabel>
            <TextField variant='outlined' placeholder="Email" id="email" type="email" name="email" onChange={formik.handleChange} />
            {formik.errors.email && <span style={{ "color": "red" }}>{formik.errors.email}</span>}
          </FormGroup>
          <FormGroup className='form-group' >
            <InputLabel className='label' htmlFor="password" >
              Password
            </InputLabel>
            <TextField variant='outlined' name="password" placeholder="Password" type="password" id='password' onChange={formik.handleChange} />
            {formik.errors.password && <span style={{ "color": "red" }}>{formik.errors.password}</span>}
          </FormGroup>
          <FormGroup className='form-group'>
            <Button variant="outlined" className="button" onClick={formik.handleSubmit} >Login</Button>
            <Button variant="outlined" className="button" onClick={() => {
              navigate("/signup")
            }} >Sign up</Button>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}

export default Login