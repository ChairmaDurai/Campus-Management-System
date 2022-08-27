import React from 'react'
import "./addBuildings.scss"
import { Button, FormGroup, InputLabel, TextField } from "@mui/material"
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddBuildings = () => {
  const url = process.env.REACT_APP_URL
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      buildingName: "",
      campusId: "",
    },
    validationSchema: Yup.object().shape({
      buildingName: Yup.string().required("Required"),
      campusId: Yup.string().required("Required"),

    }),
    onSubmit: async (values) => {
      await axios.post(`${url}/building/add/${formik.values.campusId}`, values).then(
        res => alert(JSON.stringify(res.data))
      ).then(
        () => {
          const check = window.confirm("Click Yes to List Buildings")
          if (check) {
            navigate("/buildings")
          }
        }
      ).catch(err => alert(err))
    }
  })

  return (
    <div className='addBuildings'>
      <div className="center">
        <h3 >Add Building</h3>
        <form>
          <FormGroup className='form-group' >
            <InputLabel className='label' htmlFor="building-name"  >
              Buildings Name
            </InputLabel>
            <TextField variant='outlined' placeholder="Building Name" id="building-name" onChange={formik.handleChange} name="buildingName" />
            {formik.errors.buildingName && <span style={{ "color": "red" }}>{formik.errors.buildingName}</span>}
          </FormGroup>
          <FormGroup className='form-group'>
            <InputLabel className='label' htmlFor="id"  >
              CampusId
            </InputLabel>
            <TextField variant='outlined' placeholder="Campus Id" id="id" onChange={formik.handleChange} name="campusId" />
            {formik.errors.campusId && <span style={{ "color": "red" }}>{formik.errors.campusId}</span>}

          </FormGroup>
          <FormGroup className='form-button'>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={formik.handleSubmit} >Add Buildings</Button>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={() => {
              navigate("/campus/add")
            }}>Add Campus</Button>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={() => { navigate("/campus") }} >List Campus</Button>
            <Button variant="outlined" className="button" style={{ "width": "150px", "marginRight": "10px" }} onClick={() => { navigate("/buildings/") }} >List Buildings</Button>
          </FormGroup>
        </form>
      </div>
    </div >
  )
}

export default AddBuildings