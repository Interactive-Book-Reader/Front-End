import React, { useEffect, useState } from 'react';
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
import { IconTrash, IconCloudUpload, IconAdjustments } from '@tabler/icons';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../../components/Spinner/Spinner';

const BookDetailsPage = () => {
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState('');
  const [pdfLink, setPDFLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingdetails, setLoadingDetails] = useState('');
  const updateData = {};

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

  const handleUpdate = async () => {
    console.log(imageLink);
    console.log(summary);
    if (title !== '') {
      updateData.title = title;
    }
    if (author !== '') {
      updateData.author = author;
    }
    if (genre !== '') {
      updateData.genre = genre;
    }
    if (summary !== '') {
      updateData.summary = summary;
    }
    if (price !== 0) {
      updateData.price = price;
    }
    if (imageLink !== '') {
      updateData.coverpage = imageLink;
    }
    if (pdfLink !== '') {
      updateData.pdf = pdfLink;
    }
    updateData.id = id;
    console.log(updateData);
    const response = await fetch('http://localhost:3001/api/book/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    if (data.message === 'Book is updated successfully') {
      setLoadingDetails('Book is updated successfully');
      fetchData();
    }
    console.log(data.message);
  };

  const handleUpload = () => {
    console.log('uploading');
    setLoading(true);
    if (pdf !== null) {
      const storageRef = ref(storage, `pdf/${pdf.name + v4()}`);
      uploadBytes(storageRef, pdf)
        .then((snapshot) => {
          console.log('Uploaded pdf!');
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setLoading(false);
              setPDFLink(url);
              setLoadingDetails('PDF uploaded successfully!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (image !== null) {
      const storageRef2 = ref(storage, `images/${image.name + v4()}`);
      uploadBytes(storageRef2, image)
        .then((snapshot) => {
          console.log('Uploaded coverpage!');
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setLoading(false);
              setImageLink(url);
              setLoadingDetails('Coverpage uploaded successfully!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete =async () => {
    const response = await fetch('http://localhost:3001/api/book/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }), 
    });
    const data = await response.json();
    if (data.message === 'Book is deleted successfully!') {
      window.location.href = '/products';
    }
  };
    

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [book, setBook] = useState({});

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
                <Stack mb={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="title"
                    mb="5px"
                  >
                    Title: {book.title}
                  </Typography>
                  <CustomTextField
                    label="Enter new title:"
                    id="title"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                  />

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
                  <CustomTextField
                    label="Enter new author:"
                    id="author"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setAuthor(e.target.value)}
                  />

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
                  <CustomTextField
                    label="Enter new genre:"
                    id="Genre"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setGenre(e.target.value)}
                  />

                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="summary"
                    mb="5px"
                  >
                    Summary: {book.summary}
                  </Typography>
                  <CustomTextField
                    label="Enter new summary"
                    id="summary"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setSummary(e.target.value)}
                  />

                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="price"
                    mb="5px"
                  >
                    Price: {book.price}
                  </Typography>
                  <div></div>
                  <TextField
                    label="Price"
                    type="number"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
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
                      display="block"
                    >
                      Choose book
                    </Typography>
                    <FormControl variant="outlined" display="block">
                      <OutlinedInput
                        id="pdf-file"
                        type="file"
                        accept=".pdf"
                        inputProps={{ multiple: false }}
                        onChange={(e) => setPdf(e.target.files[0])}
                      />
                    </FormControl>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="ISBN"
                      mb="5px"
                      mt="25px"
                      display="block"
                    >
                      Choose Cover Page
                    </Typography>
                    <FormControl variant="outlined" display="block">
                      <OutlinedInput
                        id="image-file"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        inputProps={{ multiple: false }}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </FormControl>
                  </div>
                </Stack>
                <div style={{ marginTop: '20px' }}>
                  {/* Your previous components here */}
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<IconCloudUpload />}
                    marginTop="10px"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                  <div style={{ marginTop: '10px' }} /> {/* Add a spacer */}
                  {!loading && (
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<IconAdjustments />}
                      marginTop="10px"
                      onClick={handleUpdate}
                    >
                      Update details
                    </Button>
                  )}
                  {loading ? (
                    <div style={{ marginTop: '10px' }}>
                      <Spinner />
                    </div>
                  ) : null}
                  <div style={{ marginTop: '10px' }} /> {/* Add a spacer */}
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<IconTrash />}
                    marginTop="10px"
                    onClick={handleDelete}
                  >
                    Delete book
                  </Button>
                  <Typography style={{ color: 'green' }}>{loadingdetails}</Typography>
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
