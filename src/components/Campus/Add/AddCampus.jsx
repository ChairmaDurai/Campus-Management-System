import React from 'react'
import "./addCampus.scss"
import { Button, FormGroup, InputLabel, TextField } from "@mui/material"
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const AddCampus = () => {
  const url = process.env.REACT_APP_URL

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      place: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required").trim(),
      place: Yup.string().required("Required").trim(),

    }),
    onSubmit: (values) => {
      axios.post(`${url}/campus/add`, values).then(
        res => alert("Sucessfully Added")
      ).then(
        () => {
          const check = window.confirm("Click Yes to List Campus")
          if (check) {
            navigate("/campus")
          }
        }
      ).catch(err => alert(err))
    }
  })
  return (
    <div className='addCampus'>
      <div className="center">
        <h3 >Add Campus</h3>
        <form>
          <FormGroup className='form-group'>
            <InputLabel className='label' htmlFor="campus_name"  >
              Campus Name
            </InputLabel>
            <TextField variant='outlined' placeholder="Campus Name" id="campus_name" onChange={formik.handleChange} name="name" />
            {formik.errors.name && <span style={{ "color": "red" }}>{formik.errors.name}</span>}
          </FormGroup>
          <FormGroup className='form-group'>
            <InputLabel className='label' htmlFor="place"  >
              Place
            </InputLabel>
            <TextField variant='outlined' placeholder="Place" id="place" onChange={formik.handleChange} name="place" />
            {formik.errors.place && <span style={{ "color": "red" }}>{formik.errors.place}</span>}
          </FormGroup>
          <FormGroup className='form-button'>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={formik.handleSubmit} >Add Campus</Button>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={() => {
              navigate("/buildings/add")
            }} >Add Buildings</Button>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={() => { navigate("/campus") }} >List Campus</Button>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={() => { navigate("/buildings/") }} >List Buildings</Button>
          </FormGroup>
        </form>
      </div >
    </div >
  )
}

export default AddCampus