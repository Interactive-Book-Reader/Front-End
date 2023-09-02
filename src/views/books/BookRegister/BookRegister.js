import { Box, Typography, OutlinedInput, FormControl } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../../../components/Spinner/Spinner';
import Cokkies from 'universal-cookie';
import jwt from 'jwt-decode';
import backgroundImg from 'src/assets/images/backgrounds/background.jpg';
import { Paper } from '@mui/material';
import MainTopic from 'src/components/Topic/MainTopic';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import { InputAdornment } from '@mui/material';

const BookRegister = ({ title, subtitle, subtext }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Title, setTitle] = useState('');
  const [ISBN, setISBN] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [coverpage, setCoverPage] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [pdfLink, setPDFink] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerBook, setRegisterBook] = useState('');

  const cookies = new Cokkies();
  const token = cookies.get('token');
  const id = jwt(token)._id;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCoverPageChange = (event) => {
    setCoverPage(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleISBNChange = (event) => {
    setISBN(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUpload = () => {
    setLoading(true);
    console.log('Uploading Image');
    if (coverpage == null) return;
    const imageRef = ref(storage, `images/${coverpage.name + v4()}`);
    uploadBytes(imageRef, coverpage)
      .then((snaphsot) => {
        console.log('Image is uploaded.');
        setLoading(false);

        // Get the download URL for the uploaded image
        getDownloadURL(snaphsot.ref)
          .then((url) => {
            setImageLink(url); // Assuming you have a function to set the URL in your component's state
            console.log(imageLink);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });

    console.log('Uploading PDF');
    if (selectedFile == null) return;
    const pdfRef = ref(storage, `pdf/${selectedFile.name + v4()}`);
    uploadBytes(pdfRef, selectedFile)
      .then((snaphsot) => {
        console.log('PDF is uploaded.');

        // Get the download URL for the uploaded image
        getDownloadURL(snaphsot.ref)
          .then((url) => {
            setPDFink(url); // Assuming you have a function to set the URL in your component's state
            console.log(pdfLink);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const handleSubmit = async (e) => {
    console.log('id is ', id);
    console.log(ISBN);
    const jsonData = {
      publisher_id: id,
      title: Title,
      ISBN: ISBN,
      author: author,
      genre: genre,
      summary: summary,
      price: price,
      coverpage: imageLink,
      pdf: pdfLink,
    }; // Your JSON data
    try {
      const response = await fetch('http://localhost:3001/api/book/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        setRegisterBook('Book Registered Successfully');
        console.log('Data sent successfully');
      } else {
        setRegisterBook('Book Registration Failed');
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
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
          <MainTopic text="Publish Book" />
        </Paper>
        <Paper
          elevation={10}
          style={{
            padding: '20px',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: '#fafaf7',
          }}
        >
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
              <CustomTextField
                label="Sample Title - The Adventure Begins"
                id="title"
                variant="outlined"
                fullWidth
                onChange={handleTitleChange}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="title"
                mb="5px"
                mt="25px"
              >
                ISBN
              </Typography>
              <CustomTextField
                label="title"
                id="title"
                variant="outlined"
                fullWidth
                onChange={handleISBNChange}
              />

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
              <CustomTextField
                label="Sample Author - John Doe"
                id="author"
                variant="outlined"
                fullWidth
                onChange={handleAuthorChange}
              />

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
              <CustomTextField
                label="Sample Genre - Science Fiction"
                id="Genre"
                variant="outlined"
                fullWidth
                onChange={handleGenreChange}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="Summary"
                mb="5px"
                mt="25px"
              >
                Summary
              </Typography>
              <CustomTextField
                label="Sample Summary - In a world of advanced technology and uncharted galaxies, follow the journey..."
                id="summary"
                variant="outlined"
                fullWidth
                onChange={handleSummaryChange}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="price"
                mb="5px"
                mt="25px"
              >
                Price
              </Typography>
              <Box boxShadow={3} p={0} borderRadius={1} style={{ width: '40%' }}>
                <CustomTextField
                  label="Price"
                  type="number"
                  variant="outlined"
                  onChange={handlePriceChange}
                  fullWidth
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
                  mt="25px"
                />
              </Box>

              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '30px',
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  mb="5px"
                  mt="20px"
                  style={{ marginRight: '10px', marginBottom: '15px' }} // Add margin to the right for spacing
                >
                  Upload PDF
                </Typography>
                <FormControl variant="outlined">
                  <OutlinedInput
                    id="pdf-file"
                    type="file"
                    accept="application/pdf"
                    inputProps={{ multiple: false }}
                    onChange={handleFileChange}
                  />
                </FormControl>

                <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>                 
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="ISBN"
                      mb="5px"
                      mt="25px"
                      style={{ marginRight: '10px', marginBottom: '25px' }}
                    >
                      Upload Coverpage
                    </Typography>         
                 
                    <FormControl variant="outlined" className="MuiOutlinedInput-root">
                      <OutlinedInput
                        id="pdf-file"
                        type="file"
                        accept=".pdf"
                        inputProps={{ multiple: false }}
                        onChange={handleCoverPageChange}
                        className="MuiOutlinedInput-input"
                      />
                    </FormControl>             
                </div>
              </div>
            </Stack>
            <Box display="flex" justifyContent="center">
              <PurpleButton label="Upload" onClick={handleUpload} />
              <div style={{ marginLeft: '10px' }}>
                {loading ? <Spinner /> : null}
                {!loading ? <PurpleButton label="Register Book" onClick={handleSubmit} /> : null}
                {registerBook === 'Book Registered Successfully' ? (
                  <Typography style={{ color: 'green' }}>{registerBook}</Typography>
                ) : registerBook === 'Book Registration Failed' ? (
                  <Typography style={{ color: 'red' }}>{registerBook}</Typography>
                ) : null}
              </div>
            </Box>
          </Box>
        </Paper>
      </div>
      {subtitle}
    </>
  );
};

export default BookRegister;
