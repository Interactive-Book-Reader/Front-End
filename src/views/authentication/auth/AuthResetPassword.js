import { Box, Typography, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import resetPasswordFunction from 'src/api/auth/resetpassword';


const AuthResetPassword = ({ title, subtitle, subtext, id, token }) => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();

    const data = {
      password: password,
      id: id,
      token: token,
    };

    // Regular expressions for symbol, number, and letter checks
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const numberRegex = /[0-9]/;
    const letterRegex = /[a-zA-Z]/;

    // Check if the password meets the criteria
    const hasSymbol = symbolRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasLetter = letterRegex.test(password);

    // Check if all criteria are met
    if (hasSymbol && hasNumber && hasLetter) {
      try {
        const response = await resetPasswordFunction(data);
        if (response.message !== 'Password is updated successfully.') {
          setError(response.message);
        }
        else{
          setError(response.message);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Password should contain at least one symbol, number, and letter');
      // Handle invalid password here (e.g., show an error message)
    }
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
            htmlFor="password"
            mb="5px"
          >
            New Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            type="password" // Set the input type to "password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
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
      <Typography style={{ color: 'red' }}>{error}</Typography>
      {subtitle}
    </form>
  );
};

export default AuthResetPassword;
