import {
    Box,
    Typography,
    Button,
    TextField,
    OutlinedInput,
    FormControl,
  } from '@mui/material';
  import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
  import { Stack } from '@mui/system';
  import React, { useState } from 'react';

  
  const BookRegister = ({ title, subtitle, subtext }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [Title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');
    const [price, setPrice] = useState('');
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleTitleChange=(event)=>{
      setTitle(event.target.value);
    }
  
    const handleAuthorChange=(event)=>{
      setAuthor(event.target.value);
    }
  
    const handleGenreChange=(event)=>{
      setGenre(event.target.value);
    }
  
    const handleSummaryChange=(event)=>{
      setSummary(event.target.value);
    }
  
    const handlePriceChange=(event)=>{
      setPrice(event.target.value);
    }
  
    const handleSubmit = async (e) => {   
      e.preventDefault();
      const formData = new FormData();
      formData.append('pdf', selectedFile); // Use "pdfFile" as the key name for the uploaded file
      formData.append('Title',Title);
      formData.append('author',author);
      formData.append('genre',genre);
      formData.append('summary',summary);
      formData.append('price',price);  
      try {
        const response = await fetch('http://localhost:3001/api/book/store', {
          method: 'POST',
          body: formData,
        });
        if (response.ok){
          console.log('Successfully registered.')
        }
  
        // Handle the response from the server
      } catch (error) {
        // Handle errors
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
          </Stack>
          <Button color="primary" variant="contained" size="large" fullWidth onClick={handleSubmit}>
            Register Book
          </Button>
        </Box>
        {subtitle}
      </>
    );
  };
  
  export default BookRegister;
  