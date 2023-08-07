import {
  Box,
  Typography,
  Button,
  Input,
  TextField,
  InputLabel,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const BookRegister = ({ title, subtitle, subtext }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    console.log(title);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile); // Use "pdfFile" as the key name for the uploaded file

    try {
      const response = await fetch('http://localhost:3001/upload', {
        // Replace "/upload" with your server-side endpoint for PDF upload
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert(response.statusText);
      } else {
        alert('no response');
      }
    } catch (error) {
      console.error('Error uploading the PDF:', error);
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
            onChange={setTitle}
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
            onChange={setAuthor}
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
            onChange={setGenre}
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
            onChange={setSummary}
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
            onChange={setPrice}
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
                endAdornment={
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                    <input type="file" style={{ display: 'none' }} accept=".pdf" />
                  </Button>
                }
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
