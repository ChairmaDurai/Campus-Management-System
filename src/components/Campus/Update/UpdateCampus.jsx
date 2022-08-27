import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup"


export default function UpdateCampus({ open, handleClose, data, id }) {
    const url = process.env.REACT_APP_URL
    const formik = useFormik({
        initialValues: {
            name: "",
            place: "",
            status: true,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().trim(),
            place: Yup.string().trim(),
            status: Yup.boolean().required("Required"),
        }),

        onSubmit: values => {
            axios.put(`${url}/campus/update/${id}`, values).then(res => {
                alert(JSON.stringify(res.data))


            }).then(handleClose).catch(err => {
                alert(err)
            })
        }
    })

    return (
        <div >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ "background": "#0a1929", "color": "lightgray" }} id="alert-dialog-title">
                    Update Campus
                </DialogTitle>
                <DialogContent style={{ "background": "#0a1929", "color": "lightgray" }}>
                    <form>
                        <FormGroup className='form-group' style={{ "color": "black" }} >
                            <InputLabel className='label' htmlFor="campus_name" style={{ "color": "lightgray" }} >
                                Campus Name
                            </InputLabel>
                            <TextField style={{ "color": "lightgray" }} variant='outlined' placeholder="Campus Name" id="campus_name" name="name" onChange={formik.handleChange} />
                            {formik.errors.name && <span style={{ "color": "red" }}>{formik.errors.name}</span>}
                        </FormGroup>
                        <FormGroup className='form-group' >
                            <InputLabel className='label' htmlFor="place" style={{ "color": "lightgray" }} >
                                Place
                            </InputLabel>
                            <TextField style={{ "color": "lightgray" }} variant='outlined' placeholder="Place" id="place" name="place" onChange={formik.handleChange} />
                            {formik.errors.place && <span style={{ "color": "red" }}>{formik.errors.place}</span>}
                        </FormGroup>
                        <FormGroup className='form-group'>
                            <InputLabel className='label' htmlFor="campus_status" style={{ "color": "lightgray" }}  >
                                Status
                            </InputLabel>
                            <Select id="campus_status"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                name="status"
                                onChange={formik.handleChange}
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
        </div >
    );
}
