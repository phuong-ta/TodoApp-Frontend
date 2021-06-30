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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const EditTask = (props) => {
    const taskId = props.id.id;
    const taskName =props.id.name;
    const taskDescription = props.id.description;
    const taskSituation = props.id.situation;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState(taskName);
    const [description, setDescription] = useState(taskDescription);
    const [situation, setSituation] = useState(taskSituation);
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
          description: description,
          situation: situation,
          token: token
        };

        axios.put(`http://127.0.0.1:8000/api/task/${taskId}`, data)
          .then((response) => {
            console.log(response);
            setDescription('');
            setName('');
            setSituation('');
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
        <Button variant="contained" color="primary"  onClick={handleClickOpen}>
          <EditIcon />
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Put Task's name and Task's description
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
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

            <TextField
              margin="dense"
              id="name"
              label="Task's Situation"
              type="text"
              fullWidth
              value={situation}
              onChange={e => setSituation(e.target.value)}
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

EditTask.propTypes = {};

export default EditTask;

/*
            <TextField
              margin="dense"
              id="name"
              label="Task's Situation"
              type="text"
              fullWidth
              value={situation}
              onChange={e => setSituation(e.target.value)}
            />
            */