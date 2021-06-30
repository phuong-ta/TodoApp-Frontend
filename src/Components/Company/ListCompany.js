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
import CreateCompany from './CreateCompany';
import DeleteCompany from './DeleteCompany';
import EditCompany from './EditCompany';
import Container from '@material-ui/core/Container';

const ListCompany = () => {
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

    axios.get('http://127.0.0.1:8000/api/company')
        .then(response => setCompanies(response.data))
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

  const result = companies.filter(company => company.id === companyID);

  if (role ==='admin') {
    return (
      <div>
        <Container maxWidth="lg">
        <CreateCompany />
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">CompanyID</TableCell>
              <TableCell align="left">company</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell component="th" scope="row">{company.id}</TableCell>
                <TableCell align="left">{company.name}</TableCell>
                <TableCell align="left">{company.address}</TableCell>
                <TableCell align="left"><EditCompany id={company} /></TableCell>
                <TableCell align="left"><DeleteCompany  id={company.id}/></TableCell>
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
            <TableCell align="left">company</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((company) => (
            <TableRow key={company.id}>
              <TableCell align="left">{company.name}</TableCell>
              <TableCell align="left">{company.address}</TableCell>
              <TableCell align="left"><EditCompany id={company} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Container>
      </div>
  );

};

ListCompany.propTypes = {};

export default ListCompany;