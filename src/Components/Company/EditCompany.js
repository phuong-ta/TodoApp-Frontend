import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState} from "react";
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';

const EditCompany = (props) => {
    const companyId = props.id.id;
    const companyName =props.id.name;
    const companyAddress = props.id.address;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState(companyName);
    const [address, setAddress] = useState(companyAddress);
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

        axios.put(`http://127.0.0.1:8000/api/company/${companyId}`, data)
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
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <EditIcon />
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
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

EditCompany.propTypes = {};

export default EditCompany;