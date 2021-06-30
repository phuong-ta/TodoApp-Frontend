import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import Container from '@material-ui/core/Container';
import CreateUserAdmin from './CreateUserAdmin';

const ListUser = () => {
  const [users, setUser] = useState([]);
  const token = sessionStorage.getItem('token');
  const userID = parseInt(sessionStorage.getItem('userId'));
  const companyID = parseInt(sessionStorage.getItem('companyId'));
  const role = sessionStorage.getItem('role');

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

    axios.get('http://127.0.0.1:8000/api/user')
        .then(response => setUser(response.data))
        .catch(error => {
            console.error('There was an error!', error);
        });
}, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const result = users.filter(user => user.company_id === companyID);

  if (role ==='admin') {
    return (
      <div>
          <CreateUserAdmin />
          <Container maxWidth="lg">
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">UserID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">{user.id}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.company_id}</TableCell>
                <TableCell align="left"><EditUser id={user} /></TableCell>
                <TableCell align="right"><DeleteUser  id={user.id}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        </Container>
        </div>
    );
  }
  return (
    <div>
      <Container maxWidth="lg">
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left"><EditUser id={user} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Container>
      </div>
  );

};

ListUser.propTypes = {};

export default ListUser;