import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import Savefile from './SaveFile';



  

const BookRegister = ({ title, subtitle, subtext }) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='title' mb="5px">Title</Typography>
                <CustomTextField id="title" variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='author' mb="5px" mt="25px">Author</Typography>
                <CustomTextField id="author" variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='ISBN' mb="5px" mt="25px">ISBN</Typography>
                <CustomTextField id="ISBN" variant="outlined" fullWidth />

                <Savefile/>


            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login">
                Register Book
            </Button>
        </Box>
        {subtitle}
    </>
);



export default BookRegister;
