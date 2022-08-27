import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import {useSelector, useDispatch} from "react-redux"
import UpdateBuildings from '../Update/UpdateBuildings';
import { useNavigate } from "react-router-dom"
import { fetchFailure, fetchSuccess } from '../../../features/buildingSlice';


const ListBuildings = () => {
  const currentBuilding = useSelector(state=>state.building.currentBuilding)
  const url = process.env.REACT_APP_URL
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchBuildings = async ()=>{
      try{
        const buildingRes = await axios.get(`${url}/building`)
        dispatch(fetchSuccess(buildingRes.data))
      }catch(err){
        dispatch(fetchFailure())
      }
    }
    fetchBuildings()
  },[load])

  const handleClose = () => {
    setOpen(false);
    setLoad(!load)
  };



  return (
    <div>
      <div style={{ "display": "flex", "width": "100%", "justifyContent": "center", "margin": "20px 0px" }}>
        <h3>List Buildings</h3>
      </div>
      <TableContainer style={{ "borderBottom": "1px solid lightgray", "borderTop": "1px solid lightgray" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell style={{ "color": "lightgray", "paddingLeft": "80px" }} align="left">Id</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="left">Name</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="left">Campus Id</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="left">Status</TableCell>
              <TableCell style={{ "color": "lightgray" }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBuilding && currentBuilding.map((item) => (
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ "color": "lightgray" }}>
                  {item._id}
                </TableCell>
                <TableCell style={{ "color": "lightgray" }} align="left">{item.buildingName}</TableCell>
                <TableCell style={{ "color": "lightgray" }} align="left">{item._campusId}</TableCell>
                <TableCell style={{ "color": "lightgray" }} align="left">{item.status === false ? "Inactive" : "active"}</TableCell>
                <TableCell style={{ "color": "lightgray" }} align="center" >
                  <Button variant='outlined' style={{ "marginRight": "5px" }} onClick={
                    () => {
                      setData(item)
                      setOpen(true)
                    }
                  } >
                    Edit
                  </Button>
                  <Button variant='outlined' style={{ "marginLeft": "5px" }} onClick={() => {
                    const check = window.confirm("Yes to Delete and No to cancel")
                    console.log(check);
                    if (check === true) {
                      axios.delete(`${url}/building/delete/${item._id}`).then(res => {
                        alert(res.data)
                        setLoad(!load)
                      }).catch(err => alert(err))
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
      <div style={{ "display": "flex", "width": "100%", "justifyContent": "center", "gap": "15px", "marginTop": "15px" }}>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/buildings/add") }} >Add Buildings</Button>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/campus/add") }} >Add Campus</Button>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/campus") }} >List Campus</Button>
        <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={() => { navigate("/buildings/") }} >List Buildings</Button>
      </div>
      <UpdateBuildings open={open} handleClose={handleClose} data={data} />
    </div>
  )
}


export default ListBuildings