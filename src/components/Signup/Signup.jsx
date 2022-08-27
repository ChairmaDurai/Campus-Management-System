import React from 'react'
import "./signup.scss"
import { Button, FormGroup, InputLabel, TextField } from "@mui/material"
import * as Yup from "yup"
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
    const url = process.env.REACT_APP_URL
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confrim_password: "",
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required("Required").min(5, "Min 5 Character").trim("No spaces allowed"),
            email: Yup.string().required("Required").email("Enter Valid Email").strict(),
            password: Yup.string().required("Required").min(8, "Min 8 Character").trim("No spaces allowed"),
            confrim_password: Yup.string().oneOf([Yup.ref("password"), null], "Password Not Match").trim("No spaces allowed")
        }),
        onSubmit: (values) => {
            axios.post(`${url}/users/register`, values).then(res => {
                alert(JSON.stringify(res.data))
                navigate("/login")
                
            }).catch(err => { alert(err); })
        }
    })


    return (
        <div className='signup'>
            <div className="center">
                <h3 >Sign Up</h3>
                <form>
                    <FormGroup className='form-group' >
                        <InputLabel className='label' htmlFor="username"  >
                            User Name
                        </InputLabel>
                        <TextField variant='outlined' placeholder="UserName" type="text" id="username" name='username' onChange={formik.handleChange} />
                        {formik.errors.username && <span style={{ "color": "red" }}>{formik.errors.username}</span>}
                    </FormGroup>
                    <FormGroup className='form-group'>
                        <InputLabel className='label' htmlFor="email"  >
                            Email
                        </InputLabel>
                        <TextField variant='outlined' placeholder="Email" id="email" type="email" name='email' onChange={formik.handleChange} />
                        {formik.errors.email && <span style={{ "color": "red" }}>{formik.errors.email}</span>}
                    </FormGroup>
                    <FormGroup className='form-group' >
                        <InputLabel className='label' htmlFor="password" >
                            Password
                        </InputLabel>
                        <TextField variant='outlined' placeholder="Password" type="password" id='password' name='password' onChange={formik.handleChange} />
                        {formik.errors.password && <span style={{ "color": "red" }}>{formik.errors.password}</span>}
                    </FormGroup>
                    <FormGroup className='form-group' >
                        <InputLabel className='label' htmlFor="confrim_password" >
                            Confrim Password
                        </InputLabel>
                        <TextField variant='outlined' placeholder="Confrim Password" type="password" id="confrim_password" name='confrim_password' onChange={formik.handleChange} />
                        {formik.errors.confrim_password && <span style={{ "color": "red" }}>{formik.errors.confrim_password}</span>}

                    </FormGroup>
                    <FormGroup className='form-group'>
                        <Button variant="outlined" className="button" onClick={formik.handleSubmit} >Sign Up</Button>
                    </FormGroup>

                </form>
            </div>
        </div>
    )
}

export default Signup