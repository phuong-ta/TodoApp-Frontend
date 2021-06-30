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
import CreateTask from './CreateTask';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';
import Container from '@material-ui/core/Container';
import CreateTaskAdmin from './CreateTaskAdmin';

const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const token = sessionStorage.getItem('token');
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
    axios.get('http://127.0.0.1:8000/api/task')
        .then(response => 
          {
            setTasks(response.data[0]);
            setCompanies(response.data[1]);
            console.log(response);
          })

        .catch(error => {
            console.error('There was an error!', error);
        });
},[]);
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const result = tasks.filter(task => task.company_id === companyID);

  if (role==='admin') {
    return (
      <div>
        <Container maxWidth="lg">
        <CreateTaskAdmin />
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Project's Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Situation</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>  
                <TableCell align="left">{task.name}</TableCell>
                <TableCell align="left">{task.description}</TableCell>
                <TableCell align="left">{task.company_id}</TableCell>
                <TableCell align="left">{task.situation}</TableCell>
                <TableCell align="left"><EditTask id={task} /></TableCell>
                <TableCell align="left"><DeleteTask id={task.id} /></TableCell>
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
      <CreateTask />
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell align="left">Project's Name</TableCell>
          <TableCell align="left">Description</TableCell>
          <TableCell align="left">Situation</TableCell>
          <TableCell align="left">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {result.map((task) => (
          <TableRow key={task.id}>
            <TableCell component="th" scope="row">{task.id}</TableCell>
            <TableCell align="left">{task.name}</TableCell>
            <TableCell align="left">{task.description}</TableCell>
            <TableCell align="left">{task.situation}</TableCell>
            <TableCell align="left"><EditTask id={task} /></TableCell>
            <TableCell align="left"><DeleteTask id={task.id} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
      </Container>
    </div>
  );

};

ListTask.propTypes = {};
export default ListTask;

