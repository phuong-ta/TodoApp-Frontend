import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import React, { useState} from "react";
import axios from 'axios';

const CreateUser = () => {

    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =useState('');
    const companyId = sessionStorage.getItem('companyId');
    const role ='user';

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
          email: email,
          password:password,
          password_confirmation: confirmPassword,
          company_id:companyId,
          role: role,
          token: token
        };

        axios.post('http://127.0.0.1:8000/api/register', data)
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
        <Button variant="contained" color="primary" startIcon ={<AddIcon />} onClick={handleClickOpen}>
          Add New User
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Put User's name, email, and password
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User's Name"
              type="text"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)} 
            />
            <TextField
              margin="dense"
              id="email"
              label="User's email"
              type="email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="User's password"
              type="password"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <TextField
              margin="dense"
              id="password"
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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

CreateUser.propTypes = {};

export default CreateUser;