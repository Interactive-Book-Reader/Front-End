import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, OutlinedInput, FormControl, Paper } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import { useLocation } from 'react-router-dom';
import { IconTrash, IconCloudUpload, IconAdjustments } from '@tabler/icons';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../../../components/Spinner/Spinner';
import backgroundImg from 'src/assets/images/backgrounds/5153829.jpg';
import MainTopic from 'src/components/Topic/MainTopic';
import { InputAdornment } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 16px',
    },
  },
  uploadIcon: {
    marginRight: theme.spacing(1),
  },
}));

const BookDetailsPage = () => {
  const classes = useStyles();

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

  const handleDelete = async () => {
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
    <PageContainer title="Book Details" description="this is Book Details">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '150vh',
          backgroundImage: `url(${backgroundImg})`, // Set the background image
          backgroundSize: 'cover', // Adjust the background size
          backgroundPosition: 'center', // Center the background image
        }}
      >
        <Paper
          elevation={10}
          style={{
            alignItems: 'center',
            padding: '10px',
            width: '19%',
            height: '50%',
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: '#fafaf7',
          }}
        >
          <MainTopic text="Change Book Details" />
        </Paper>
        <Paper
          elevation={10}
          style={{
            padding: '30px',
            width: '80%',
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#fafaf7',
          }}
        >
          <Box>
            <Grid container spacing={3}>
              <>
                <Grid item xs={12} lg={3.2}>
                  <style>
                    {`
                      .styled-image {
                        border-radius: 20px;
                        box-shadow: 0px 0px 5px rgba(0.7, 0, 0.9, 0.9);
                        max-width: 100%;
                        max-height: 300px;
                        transition: transform 0.3s; /* Add a smooth transition effect */
                      }

                      /* Apply the hover effect when hovering over .styled-image */
                      .styled-image:hover {
                        transform: scale(1.1); /* Increase the size by 5% when hovering */
                      }
                    `}
                  </style>
                  <img
                    src={book.coverpage}
                    alt="img"
                    width="100%"
                    className="styled-image" // Apply the CSS class
                  />
                </Grid>
                <Grid item xs={8} lg={8.7}>
                  <Box>
                    <Stack mb={9}>
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
                        mt="15px"
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
                        mt="15px"
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
                        mt="15px"
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
                        mt="15px"
                      >
                        Price: {book.price}
                      </Typography>
                      <div></div>
                      <CustomTextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setPrice(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" style={{ padding: '0 8px' }}>
                              Rs.
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          min: 0, // Set the minimum allowed value to 0
                          style: {
                            /* Additional styles for the input field itself */
                            '-moz-appearance': 'textfield' /* Remove default arrows in Firefox */,
                          },
                        }}
                        style={{ width: '100%' }} // Apply width to the TextField
                      />

                                     
                        <div className={classes.root}>
                        <FormControl variant="outlined">
                        <InputLabel htmlFor="pdf-file">Upload PDF</InputLabel>
                          <OutlinedInput
                            id="pdf-file"
                            type="file"
                            accept=".pdf"
                            inputProps={{ multiple: false }}
                            onChange={(e) => setPdf(e.target.files[0])}
                            startAdornment={
                              <CloudUploadIcon className={classes.uploadIcon} />
                            }
                            label="Upload PDF"
                          />
                        </FormControl>
                        </div>
                 
                      <div>
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        startIcon={<IconCloudUpload />}
                        onClick={handleUpload}
                        style={{ width: '50%' }}
                      >
                        Upload
                      </Button>
                      <div style={{ marginTop: '10px' }} /> {/* Add spacing */}
                      {!loading && (
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          startIcon={<IconAdjustments />}
                          onClick={handleUpdate}
                          style={{ width: '50%' }}
                        >
                          Update details
                        </Button>
                      )}
                      {loading ? (
                        <div style={{ marginTop: '10px' }}>
                          <Spinner />
                        </div>
                      ) : null}
                      <div style={{ marginTop: '10px' }} /> {/* Add spacing */}
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        startIcon={<IconTrash />}
                        onClick={handleDelete}
                        style={{ width: '50%' }}
                      >
                        Delete book
                      </Button>
                    </div>
                    <Typography style={{ color: 'green' }}>{loadingdetails}</Typography>
                  </Box>
                </Grid>
              </>
            </Grid>
          </Box>
        </Paper>
      </div>
    </PageContainer>
  );
};

export default BookDetailsPage;
