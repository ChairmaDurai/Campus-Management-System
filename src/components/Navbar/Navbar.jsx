import React, { useEffect, useState } from 'react'
import "./navbar.scss"
import {AccountCircleRounded} from "@mui/icons-material/"
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import "./navbar.scss"
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { logout, selectUser } from '../../features/Reducer';



const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [loading, setLoading] = useState(false)
    const [user, setData] = useState(JSON.parse(localStorage.getItem("userData")))
    // const Avatar = user?.username?.toUpperCase()?.charAt(0)
    const data = useSelector(selectUser)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
    }, [loading, user, data])

    const handleLogout = async () => {
        dispatch(logout())
        localStorage.clear()
        selectUser(null)
        setLoading(!loading)
        navigate("/login")
        window.location.reload(false)
    }

    return (
        <div style={{ "height": "56px", "width": "100vw", "display": "flex", "alignItems": "center" }}>
            <div style={{ "display": "flex", "flex": "1", "width": "100%", "justifyContent": "start" }}>
                Logo
            </div>
            <div className="logo" style={{ "display": "flex", "flex": "1", "width": "100%" }}>
                <div>Campus Management System</div>
            </div>
            {
                data || user ?
                    <React.Fragment >
                        <Box sx={{ display: 'flex', "flex": "1", "width": "100%", alignItems: 'center', textAlign: 'center' }}>
                            <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                            <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                            <Tooltip title="Account settings" >
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu

                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem style={{ "color": "black" }} className="menu">
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem style={{ "color": "black" }} className="menu">
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem style={{ "color": "black" }} className="menu" >
                                <ListItemIcon color='primary'>
                                    <PersonAdd className='icon' fontSize="small" />
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem style={{ "color": "black" }} className="menu">
                                <ListItemIcon >
                                    <Settings className='icon' fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem style={{ "color": "black" }} className="menu" onClick={handleLogout} >
                                <ListItemIcon>
                                    <Logout className='icon' fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </React.Fragment> :
                    <div style={{ "display": "flex", "justifyContent": "flex-end" }}>
                        <Button variant="outlined" className="button" onClick={() => {
                            navigate("/login")
                        }} >Login</Button>

                    </div>
            }



        </div>
    )
}



export default Navbar