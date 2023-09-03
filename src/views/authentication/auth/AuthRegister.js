import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessege, setErrorMessege] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterSubmit = async (event) => {
    console.log('Regitser function is called');
    event.preventDefault();
    if (name === '' || username === '' || email === '' || phoneNumber === '' || password === '') {
      setErrorMessege('All fields are required!');
    } else if (password.length < 8) {
      setErrorMessege('Password must be at least 8 characters long.');
    } else {
      const loginData = {
        name: name,
        username: username,
        email: email,
        phonenumber: phoneNumber,
        password: password,
      };

      try {
        const response = await fetch('http://localhost:3001/api/publisher/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        const responseData = await response.json();

        if (responseData.message==='OTP is sent successfully.'){
            console.log(responseData);
            window.location.href = `/auth/otpverification?id=${responseData.data.publisherId}&email=${responseData.data.email}`;
        }else{
            setErrorMessege(responseData.message);
        }

        
      } catch (error) {
        console.log('Error', error);
      }
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={5}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField id="name" variant="outlined" fullWidth onChange={handleNameChange} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField id="name" variant="outlined" fullWidth onChange={handleUsernameChange} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField id="email" variant="outlined" fullWidth onChange={handleEmailChange} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Phone Number
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            onChange={handlePhoneNumberChange}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            onChange={handlePasswordChange}
            type="password" // Set the input type to "password"
          />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit" // Use type="submit" to trigger form submission
          sx={{ backgroundColor: '#003566' }}
        >
          Sign Up
        </Button>
        <Typography style={{ color: 'red' }}>{errorMessege}</Typography>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthRegister;
