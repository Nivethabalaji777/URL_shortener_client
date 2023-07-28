import React, { useEffect, useState } from 'react'

import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")) setAuth(true)
  },[])

//Logout
  const handleClose = ()=>{
    localStorage.removeItem("token");
    navigate("/")
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("anchor", anchorEl)

  return (
    <nav className='header-navbar'>
        <h2 className='header-text'>tinify<span class="highlight">URL</span></h2>
        
        {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
         </div>
        )}
    </nav>
  )
}

export default Header