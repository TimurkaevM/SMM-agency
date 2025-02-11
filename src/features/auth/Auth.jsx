import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './authSlice';
import { useAuthStyles } from '../users/styles';

function Authorisation() {
  const classes = useAuthStyles();
  const dispatch = useDispatch();
  const [username, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.authSlice.loading);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      fetchData({
        username: username,
        password: password,
      }),
    );
  };
  const loginChange = (e) => {
    setLogin(e.target.value);
  };
  const passChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={username}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={loginChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passChange}
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item />
          </Grid>
        </form>
      </div>
      <Box mt={8} />
    </Container>
  );
}

export default Authorisation;
