import Logout from '../Auth/Logout';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React , { useState, useEffect }from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  return (
      <div>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <IconButton edge="start" className={classes.menuButton} variant="outlined" color="inherit" aria-label="menu">
            <MenuIcon variant="outlined" color="inherit" />
          </IconButton>
        </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to="/TodoList">TodoList</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/Company">Company</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/User">User</Link></MenuItem>
            </Menu>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
          <Logout />
        </Toolbar>
      </AppBar>
    </div>
    </div>
  );
}