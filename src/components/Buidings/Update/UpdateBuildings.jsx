import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'



export default function UpdateBuildings({ open, handleClose, data, onChange, id }) {
    const url = process.env.REACT_APP_URL
    const formik = useFormik({
        initialValues: {
            buildingName: "",
            status: true,
        },
        validationSchema: Yup.object().shape({
            buildingName: Yup.string().required("Required"),
            status: Yup.boolean().required("Required")

        }),
        onSubmit: (values) => {
            axios.put(`${url}/building/update/${id}`, values).then(
                res => {
                    alert(JSON.stringify(res.data))
                    handleClose()
                }

            ).catch(err => alert(err))
        }
    })


    return (
        <div className='update'>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ "background": "#0a1929", "color": "lightgray" }} id="alert-dialog-title">
                    Update Building
                </DialogTitle>
                <DialogContent style={{ "background": "#0a1929", "color": "lightgray" }}>
                    <form>
                        <FormGroup className='form-group'  >
                            <InputLabel className='label' htmlFor="building_name" style={{ "color": "lightgray" }}  >
                                Building Name
                            </InputLabel>
                            <TextField variant='outlined' placeholder="Building Name" id="building_name" style={{ "color": "lightgray" }} onChange={formik.handleChange} name="buildingName" />
                            {formik.errors.buildingName && <span style={{ "color": "red" }} >{formik.errors.buildingName}</span>}
                        </FormGroup>
                        <FormGroup className='form-group' >
                            <InputLabel className='label' htmlFor="building_status" style={{ "color": "lightgray" }}  >
                                Status
                            </InputLabel>
                            <Select id="building_status"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={formik.handleChange}
                                name="status"
                                style={{ "background": "#0a1929", "color": "lightgray" }}

                            >
                                <MenuItem style={{ "background": "white", "color": "#0a1929" }} value="">None</MenuItem>
                                <MenuItem style={{ "background": "white", "color": "#0a1929" }} value={true}>Open</MenuItem>
                                <MenuItem style={{ "background": "white", "color": "#0a1929" }} value={false}>Closed</MenuItem>

                            </Select>
                            {formik.errors.status && <span style={{ "color": "red" }}>{formik.errors.status}</span>}
                        </FormGroup>
                    </form>
                </DialogContent>
                <DialogActions style={{ "background": "#0a1929", "color": "lightgray" }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus onClick={formik.handleSubmit}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
