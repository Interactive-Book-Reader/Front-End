import { Box, Typography, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';


const AuthResetPassword= ({ title, subtitle, subtext }) => {
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
            fullWidth
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
        >
          Submit
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthResetPassword;
