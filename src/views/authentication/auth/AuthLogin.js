import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import Cookies from 'universal-cookie';
import LoginFunction from '../../../api/auth/login';
import swal from 'sweetalert';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const cookies = new Cookies();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessege, setErrorMessege] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const responseData = await LoginFunction(loginData);
      if (responseData.message === 'Login Successful') {
        console.log(responseData);
        swal({
          title: 'Done!',
          text: 'Login as a publisher.',
          icon: 'success',
          timer: 1000, // Set the timer to 2000 milliseconds (2 seconds)
          button: false,
        });

        // Use setTimeout to wait for 2 seconds before executing the following code
        setTimeout(() => {
          cookies.set('token', responseData.token, { path: '/' });
          cookies.set('user',"login");
          window.location.href = `/home`;
        }, 1000); // Also set the delay here to 2000 milliseconds (2 seconds)
      } else {
        setErrorMessege(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            id="username"
            onChange={handleUsernameChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            type="password" // Set the input type to "password"
            onChange={handlePasswordChange}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember this Device" />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgotpassword"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit" // Use type="submit" to trigger form submission
          sx={{ backgroundColor: '#003566' }}
        >
          Sign In
        </Button>
        <Typography style={{ color: 'red' }}>{errorMessege}</Typography>
      </Box>
      {subtitle}
    </form>
  );
};

export const getAuthToken = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  return token;
};

export default AuthLogin;
