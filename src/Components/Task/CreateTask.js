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

const CreateTask = () => {

    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState(null);
    const company_Id = parseInt(sessionStorage.getItem('companyId'));
    const situation = 'undone';
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
          company_id: company_Id,
          description: description,
          situation: situation,
          token: token
        };

        axios.post('http://127.0.0.1:8000/api/task', data)
          .then((response) => {
            console.log(response);
            setData(response);
            setDescription('');
            setName('');
          }, (error) => {
            console.log(error);
          });
    }
    if (data) {
      return window.location.reload(false);
    }
    return (
        <div>
        <Button variant="outlined" color="primary" startIcon ={<AddIcon />} onClick={handleClickOpen}>
          Add New Task
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Put task's name and tasks' description
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="task"
              label="Task's Name"
              type="text"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)} 
            />
            <TextField
              margin="dense"
              id="name"
              label="Task's Description"
              type="text"
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {handleClose();handleSubmit();}} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

CreateTask.propTypes = {};

export default CreateTask;