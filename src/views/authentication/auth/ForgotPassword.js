import { Box, Typography, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import forgotPasswordFunction from '../../../api/auth/forgotpassword';

const ForgotPassword = ({ title, subtitle, subtext }) => {
  const [username, setUsername] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
        username: username,
      };

    try{
        const responseData = await forgotPasswordFunction(loginData);
        console.log(responseData);    
    }
    catch(error){
        console.error('Error:', error);
    }
  };

  const hanldeSetUsername = (event) => {
    setUsername(event.target.value);
  };
  return (
    <form>
      {title ? (
        <Typography fontWeight="700" variant="h4" mb={1} align="center">
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
            variant="outlined"
            fullWidth
            onChange={hanldeSetUsername}
          />
        </Box>
      </Stack>
      <br />
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit" // Use type="submit" to trigger form submission
          sx={{ backgroundColor: '#003566' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default ForgotPassword;
