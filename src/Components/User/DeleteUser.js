import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import React, { useState} from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteUser(props) {
    const userId = props.id;
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

        axios.delete(`http://127.0.0.1:8000/api/user/${userId}`, data)
          .then((response) => {
            console.log(response);
            setData(response);
          }, (error) => {
            console.log(error);
          });
    }
    
    if (data) {
        return window.location.reload(false);
    };    

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Remove User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want remove this User from this list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Disagree
          </Button>
          <Button onClick={() => {handleClose();handleSubmit();}} color="secondary" variant="contained">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}