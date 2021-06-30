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

const EditUser = (props) => {

    const userId = props.id.id;
    const userName =props.id.name;
    const userEmail = props.id.email;
    const [data, setData] = useState(null);
    const token = sessionStorage.getItem('token');

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit =()=>{
        const data = {
          name: name,
          email: email,
          token: token
        };

        axios.put(`http://127.0.0.1:8000/api/user/${userId}`, data)
          .then((response) => {
            console.log(response);
            setEmail('');
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
        <DialogTitle id="form-dialog-title">Change your information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can put new name or new email.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Your name"
              type="text"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)} 
            />
            <TextField
              margin="dense"
              id="name"
              label="Your's Email"
              type="text"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
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

EditUser.propTypes = {};

export default EditUser;