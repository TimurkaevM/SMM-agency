import React, { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSignUpStyles } from '../styles';
import { fetchRegistration } from '../usersSlice';

function SignUp() {
  const classes = useSignUpStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authSlice.loading);

  const [login, setLogin] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [workerPass, setWorkerPass] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');

  const workerLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const firstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const surnameChange = (e) => {
    setSurname(e.target.value);
  };
  const workerPassChange = (e) => {
    setWorkerPass(e.target.value);
  };
  const workerEmailChange = (e) => {
    setWorkerEmail(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    dispatch(
      fetchRegistration({
        username: login,
        name: firstname,
        surname: surname,
        mail: workerEmail,
        password: workerPass,
      }),
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up your worker
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={firstnameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={surname}
                onChange={surnameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={workerEmail}
                onChange={workerEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="login"
                value={login}
                onChange={workerLoginChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={workerPass}
                onChange={workerPassChange}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleButtonClick}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
