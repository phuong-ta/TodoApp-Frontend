import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import React, { useState, useEffect} from "react";
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

const CreateUserAdmin = () => {

    const [open, setOpen] = React.useState(false);
    const [companies, setCompanies] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =useState('');

    const [companyId, setCompanyId] = useState('');
    const [data, setData] = useState(null);
    const role = 'user';
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
            setPassword('');
            setConfirmPassword('');
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
        <Button variant="outlined" color="primary" startIcon ={<AddIcon />} onClick={handleClickOpen}>
          Create New User
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create nee user</DialogTitle>
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
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

CreateUserAdmin.propTypes = {};

export default CreateUserAdmin;