import React, { useEffect, useState } from 'react'
import "./login.scss"
import { Button, FormGroup, InputLabel, TextField } from "@mui/material"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { login } from '../../features/Reducer'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false)
  useEffect(() => {

  }, [loading])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required").email("Enter Valid Email").strict(),
      password: Yup.string().required("Required").min(8, "Min 8 Character").trim("No spaces allowed"),
    }),
    onSubmit: (values) => {
      axios.post("http://localhost:5300/api/users/login", values).then(res => {
        // alert(JSON.stringify(res.data))
        localStorage.setItem("userData", JSON.stringify(res.data))
        dispatch(login({
          username: res.data.username,
          email: res.data.email,
        }))
        navigate("/campus")
        setLoading(!loading)
      }).catch(err => { alert(err); })
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
            {formik.errors.email && <span style={{"color" : "red"}}>{formik.errors.email}</span>}
          </FormGroup>
          <FormGroup className='form-group' >
            <InputLabel className='label' htmlFor="password" >
              Password
            </InputLabel>
            <TextField variant='outlined' name="password" placeholder="Password" type="password" id='password' onChange={formik.handleChange} />
            {formik.errors.password && <span style={{"color" : "red"}}>{formik.errors.password}</span>}
          </FormGroup>
          <FormGroup className='form-group'>
            <Button variant="outlined" className="button" onClick={formik.handleSubmit} >Login</Button>
            <Button variant="outlined" className="button" onClick={()=>{
              navigate("/signup")
            }} >Sign up</Button>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}

export default Login