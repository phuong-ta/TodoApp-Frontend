import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";

const CreateCompany = () => {

    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [data, setData] = useState(null);
    const token = sessionStorage.getItem('token');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit =()=>{
        const data = {
          name: name,
          address: address,
          token: token
        };

        axios.post('http://127.0.0.1:8000/api/company', data)
          .then((response) => {
            console.log(response);
            setAddress('');
            setName('');
            setData(response);
          }, (error) => {
            console.log(error);
          });
    }
    if (data) {
        return window.location.reload(false);
    }
    return (
        <div>
        <Button variant="contained" color="primary" startIcon ={<AddIcon />} onClick={handleClickOpen}>
          Add New Company
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new Company</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Put Company's name and company's description
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Company's Name"
              type="text"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)} 
            />
            <TextField
              margin="dense"
              id="name"
              label="Company's Address"
              type="text"
              fullWidth
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {handleClose();handleSubmit();}} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

CreateCompany.propTypes = {};

export default CreateCompany;