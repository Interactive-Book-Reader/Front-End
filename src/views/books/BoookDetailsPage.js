import React,{useEffect,useLayoutEffect,useState} from 'react';
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
import { useLocation } from 'react-router-dom';
import { IconTrash } from '@tabler/icons';

const BookDetailsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [book, setBook] = useState({});

  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/book/show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    setBook(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
      
            <>
              <Grid item xs={12} lg={3}>
                <Typography>
                  <img src={book.coverpage} alt="img" width="100%" />
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
                      Title: {book.title}
                    </Typography>
                    <CustomTextField label="Enter new title:" id="title" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="author"
                      mb="5px"
                      mt="25px"
                    >
                      Author: {book.author}
                    </Typography>
                    <CustomTextField label="Enter new author:" id="author" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="Genre"
                      mb="5px"
                      mt="25px"
                    >
                      Genre: {book.genre}
                    </Typography>
                    <CustomTextField label="Enter new genre:" id="Genre" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="summary"
                      mb="5px"
                    >
                      Summary: {book.summary}
                    </Typography>
                    <CustomTextField label="Enter new summary" id="summary" variant="outlined" fullWidth />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="price"
                      mb="5px"
                    >
                      Price: {book.price}
                    </Typography>
                    <div>                   
                      
                    </div>
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

        </Grid>
      </Box>
    </PageContainer>
  );
};

export default BookDetailsPage;
