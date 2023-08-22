import { Box, Typography, Button, TextField, OutlinedInput, FormControl } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const BookRegister = ({ title, subtitle, subtext }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [coverpage, setCoverPage] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [pdfLink, setPDFink] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCoverPageChange = (event) => {
    setCoverPage(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
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
    console.log('Uploading Image');
    if (coverpage == null) return;
    const imageRef = ref(storage, `images/${coverpage.name + v4()}`);
    uploadBytes(imageRef, coverpage)
      .then((snaphsot) => {
        console.log('Image is uploaded.');

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
    const jsonData = {
      title: Title,
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
        console.log('Data sent successfully');
      } else {
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
            label="title"
            id="title"
            variant="outlined"
            fullWidth
            onChange={handleTitleChange}
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
            label="author"
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
            label="genere"
            id="Genre"
            variant="outlined"
            fullWidth
            onChange={handleGenreChange}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="summary"
            mb="5px"
          >
            Summary
          </Typography>
          <CustomTextField
            label="summary"
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
          >
            Price
          </Typography>
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            onChange={handlePriceChange}
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
                onChange={handleFileChange}
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
            >
              Upload Coverpage
            </Typography>
            <FormControl variant="outlined">
              <OutlinedInput
                id="pdf-file"
                type="file"
                accept=".pdf"
                inputProps={{ multiple: false }}
                onChange={handleCoverPageChange}
              />
            </FormControl>
          </div>
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleUpload}>
          Upload
        </Button>
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleSubmit}>
          Register Book
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default BookRegister;
