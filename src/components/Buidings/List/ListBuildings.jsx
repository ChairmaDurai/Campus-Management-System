import axios from 'axios'
import "./listBuildings.scss"
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import UpdateBuildings from '../Update/UpdateBuildings';
import {useNavigate} from "react-router-dom"


const ListBuildings = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate()



  useEffect(() => {
    axios.get("http://localhost:5300/api/building/").then(res => {
      setData(res.data)
    }).catch(err => alert(err))
  }, [loading])




  const handleClose = () => {
    setOpen(false);
    setLoading(!loading)
  };



  return (
    <div>
      <div style={{"display" : "flex" , "width" : "100%", "justifyContent" : "center" , "margin" : "20px 0px"}}>
      <h3>List Buildings</h3>
      </div>
       <TableContainer style={{"borderBottom" : "1px solid lightgray" , "borderTop" : "1px solid lightgray"  }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell style={{"color" : "lightgray", "paddingLeft" : "80px" }} align="left">Id</TableCell>
              <TableCell style={{"color" : "lightgray"}} align="left">Name</TableCell>
              <TableCell style={{"color" : "lightgray"}} align="left">Campus Id</TableCell>
              <TableCell style={{"color" : "lightgray"}} align="left">Status</TableCell>
              <TableCell style={{"color" : "lightgray"}} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{"color" : "lightgray"}}>
                  {row._id}
                </TableCell>
                <TableCell style={{"color" : "lightgray"}} align="left">{row.buildingName}</TableCell>
                <TableCell style={{"color" : "lightgray"}} align="left">{row._campusId}</TableCell>
                <TableCell style={{"color" : "lightgray"}} align="left">{row.status == false ? "Inactive" : "active"}</TableCell>
                <TableCell style={{"color" : "lightgray"}} align="center" >
                  <Button variant='outlined' style={{ "marginRight": "5px" }} onClick={
                    () => {
                    setId(row._id)
                    setOpen(true)
                    }
                  } >
                    Edit
                  </Button>
                  <Button variant='outlined' style={{ "marginLeft": "5px" }} onClick={() => {
                    const check = window.confirm("Yes to Delete and No to cancel")
                    console.log(check);
                    if (check === true) {
                      axios.delete(`http://localhost:5300/api/building/delete/${row._id}`).then(res => {
                        alert(res.data)
                        setLoading(!loading)
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
      <div style={{"display" : "flex" , "width" : "100%" , "justifyContent" : "center" , "gap" : "15px", "marginTop" : "15px"}}>
      <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={()=>{navigate("/buildings/add")}} >Add Buildings</Button>
      <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={()=>{navigate("/campus/add")}} >Add Campus</Button>
      <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={()=>{navigate("/campus")}} >List Campus</Button>
      <Button variant="outlined" className="button" style={{ "width": "150px" }} onClick={()=>{navigate("/buildings/")}} >List Buildings</Button>
      </div>
            <UpdateBuildings open={open} handleClose={handleClose} data={data} id={id} />
    </div>
  )
}


export default ListBuildings