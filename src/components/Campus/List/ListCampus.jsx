import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import UpdateCampus from '../Update/UpdateCampus';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSuccess, fetchFailure } from '../../../features/campusSlice';


const ListCampus = () => {
  const currentCampus = useSelector((state) => state.campus.currentCampus)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [res , setRes] = useState([])
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const campusRes = await axios.get(`${url}/campus`)
        dispatch(fetchSuccess(campusRes.data))
        setRes(campusRes.data)
      } catch (err) {
        dispatch(fetchFailure())

        alert(err.response.data)
      }
    }
    fetchCampus()
  }, [dispatch, load])

  const handleClose = () => {
    setOpen(false);
    setLoad(!load)
  };



  return (
    <div>
      <div style={{ "display": "flex", "width": "100%", "justifyContent": "center", "margin": "20px 0px" }}>
        <h3>List Campus</h3>
      </div>
      <TableContainer style={{ "borderBottom": "1px solid lightgray", "borderTop": "1px solid lightgray" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell style={{ "color": "lightgray", "paddingLeft": "80px" }} align="left">Id</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="left">Name</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="left">Place</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="left">Status</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCampus && currentCampus.map((item) => (
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ "color": "lightgray" }}>
                  {item._id}
                </TableCell>
                <TableCell style={{ "color": "lightgray" }} align="left">{item.name}</TableCell>
                <TableCell style={{ "color": "lightgray" }} align="left">{item.place}</TableCell>
                <TableCell style={{ "color": "lightgray" }} align="left">{item.status === false ? "Inactive" : "active"}</TableCell>
                <TableCell style={{ "color": "lightgray" }} align="center" >
                  <Button variant='outlined' style={{ "marginRight": "5px" }} onClick={
                    () => {
                      setData(item)
                      setOpen(true);
                    }
                  } >
                    Edit
                  </Button>
                  <Button variant='outlined' style={{ "marginLeft": "5px" }} onClick={() => {
                    const check = window.confirm("Yes to Delete and No to cancel")

                    if (check === true) {
                      axios.delete(`${url}/campus/delete/${item._id}`).then(res => {
                        alert(res.data)
                        setLoad(!load)
                      }).catch(err => alert(err.response.data))
                    } else {
                      alert("Not deleted")
                    }

                  }} >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateCampus open={open} handleClose={handleClose} data={data} />
      <div style={{ "display": "flex", "width": "100%", "justifyContent": "center", "gap": "15px", "marginTop": "15px" }}>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/campus/add") }} >Add Campus</Button>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/buildings/add") }} >Add Buildings</Button>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/campus") }} >List Campus</Button>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/buildings/") }} >List Buildings</Button>
      </div>
    </div>
  )
}

export default ListCampus