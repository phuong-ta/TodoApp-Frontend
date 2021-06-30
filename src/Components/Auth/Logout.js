import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import React, { useState} from "react";
import { Redirect, useHistory} from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Logout(props) {
    const history = useHistory();
    const token = sessionStorage.getItem('token');
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit =()=>{
        const data = {
          token: token
        };

        axios.post(`http://127.0.0.1:8000/api/logout`, data)
          .then((response) => {
            console.log(response);
            setData(response);
            sessionStorage.clear();
          }, (error) => {
            console.log(error);
          });
    }
    
    if (data) {
      history.push("/");
    };    

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        <ExitToAppIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Sign Out?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Caneled
          </Button>
          <Button onClick={() => {handleClose();handleSubmit();}} color="secondary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}