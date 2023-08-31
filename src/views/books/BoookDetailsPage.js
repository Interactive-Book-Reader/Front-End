import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/products/s4.jpg';
import { Link } from 'react-router-dom';
import { IconTrash } from '@tabler/icons';


const book1 = [
  {
    title: 'Harry Potter and the Philosophers Stone',
    Author: 'J.K. Rowling',
    photo: img1,
    price: 2690,
  },
];

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {book1.map((book, index) => (
            <>
              <Grid item xs={12} lg={3} key={index}>
                <Typography component={Link} to="/mybook">
                  <img src={book.photo} alt="img" width="100%" />
                </Typography>
              </Grid>
              <Grid item xs={12} lg={5}>
                <Box>
                  <Stack mb={5}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="title"
                      mb="5px"
                    >
                      Title
                    </Typography>
                    <CustomTextField label="title" id="title" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="author"
                      mb="5px"
                      mt="25px"
                    >
                      Author
                    </Typography>
                    <CustomTextField label="author" id="author" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="Genre"
                      mb="5px"
                      mt="25px"
                    >
                      Genre
                    </Typography>
                    <CustomTextField label="genere" id="Genre" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="summary"
                      mb="5px"
                    >
                      Summary
                    </Typography>
                    <CustomTextField label="summary" id="summary" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="price"
                      mb="5px"
                    >
                      Price
                    </Typography>
                    <TextField
                      label="Price"
                      type="number"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: '$',
                      }}
                    />

                    <div style={{ marginTop: '20px' }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="ISBN"
                        mb="5px"
                        mt="25px"
                      >
                        Upload PDF
                      </Typography>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          id="pdf-file"
                          type="file"
                          accept=".pdf"
                          inputProps={{ multiple: false }}
                        />
                      </FormControl>
                    </div>
                  </Stack>
                  <Button color="primary" variant="contained" size="large" fullWidth>
                    Register Book
                  </Button>
                  <div>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<IconTrash />}
                    >
                      Delete
                    </Button>
                  </div>
                </Box>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
