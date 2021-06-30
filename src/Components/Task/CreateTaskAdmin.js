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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 550,
      maxWidth: 700,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 650,
      },
    },
  };

const CreateTaskAdmin = () => {

    const [open, setOpen] = React.useState(false);
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [data, setData] = useState(null);
    const situation = 'undone';
    const token = sessionStorage.getItem('token');

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        axios.interceptors.request.use(
          config =>{
             config.headers.authorization = `Bearer ${token}`;
             return config;
          },
          error =>{
              return Promise.reject(error);
          }
      );
    
        axios.get('http://127.0.0.1:8000/api/company')
            .then(response => setCompanies(response.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleSubmit =()=>{
        const data = {
          name: name,
          company_id: companyId,
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

            <FormControl className={classes.formControl}>
            <InputLabel id="company">Company</InputLabel>
            <Select
            labelId="companyId"
            id="companyId"
            value={companyId}
            onChange={e => setCompanyId(e.target.value)}
            input={<Input />}
            MenuProps={MenuProps}
            >
            {companies.map((company) => (
                <MenuItem key={company.id} value={company.id} >
                {company.name}
                </MenuItem>
            ))}
            </Select>
            </FormControl>
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

CreateTaskAdmin.propTypes = {};

export default CreateTaskAdmin;