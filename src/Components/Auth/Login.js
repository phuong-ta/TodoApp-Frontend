import React, { useState} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Login() {
 
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [authError, setAuthError] = React.useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
    .then(response => {
        axios.post('http://127.0.0.1:8000/api/login', {
            email: email,
            password: password
        }).then(response => {
            if (response.status === 201) {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userId', response.data.user.id);
                sessionStorage.setItem('companyId', response.data.user.company_id);
                sessionStorage.setItem('role', response.data.user.role);
                setIsLogin(true);
            }
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                setAuthError(true);
            } else {
                setIsError(true);
                console.error(error);
            }
        });
    });
  }
  
    if (isLogin === true) {
      return <Redirect to='/TodoList' />
    }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          {authError ? <div className="alert alert-danger">Credentials not recognised. Please try again.</div> : null}
          {authError ? <div className="alert alert-danger">There was an error submitting your details.</div> : null}
          Sign In
        </Button>
      </form>
    </div>
    </Container>
);
}
 
export default Login;
/*

const [loading, setLoading] = useState(false);
setLoading(false);
    <div className="container p-3">
      <div style={{ maxWidth: 350 }}>
        <div classNames="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div classNames="form-group">
          <label htmlFor="password" className="mt-2">Password</label>
          <input
            type="password"
            className="form-control"
            id="password "
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >{loading ? 'Loading...' : 'Submit'}</button>
      </div>
    </div>

*/

/*
  const handleSubmit = () => {
    setIsError(false);
    const data = {
      email: email,
      password: password
    }
    axios.defaults.withCredentials = true;
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
    .then(response => {
      axios.post('http://127.0.0.1:8000/api/login', data)
      .then(response => {
        console.log(response);
        setEmail('');
        setPassword('');
        setData(response.data);
        if (response.status === 201) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userId', response.data.user.id)
          sessionStorage.setItem('companyId', response.data.user.company_id)
          sessionStorage.setItem('role', response.data.user.role)
          sessionStorage.setItem('isLoggedIn', true)
        }
      }).catch(err => {
        console.log('error',err);
        setIsError(true);
      });
      })
  }
*/