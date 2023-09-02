import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import CoverPage from '../../components/CoverPage/CoverPage';
import ComponentSlider from '../../components/ComponentSlider/ComponentSlider';
import { getAuthToken } from '../authentication/auth/AuthLogin';
import jwt from 'jwt-decode';

const Products = () => {
  const token = getAuthToken();
  const id = jwt(token)._id;
  const [booklist, setBooklist] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/book/publisherbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publisher_id: id }),
    });
    const data = await response.json();
    setBooklist(data.response);
    console.log(data.response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const newbooklist = booklist.map((book, index) => (
    <CoverPage
      title={book.title}
      author={book.author}
      price={book.price}
      photo={book.coverpage}
      id={book._id}
    />
  ));
  return (
    <PageContainer title="Products" description="this is Products">
      <div style={tableContainerStyle}>
        <h2 style={tableTitleStyle}>Book List</h2>
        <table style={bookTableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Title</th>
              <th style={headerCellStyle}>Author</th>
              <th style={headerCellStyle}>Price</th>
              <th style={headerCellStyle}>Genre</th>
              <th style={headerCellStyle}>Summary</th>
              <th style={headerCellStyle}>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {booklist.map((book, index) => (
              <tr key={index}>
                <td style={cellStyle}>{book.title}</td>
                <td style={cellStyle}>{book.author}</td>
                <td style={cellStyle}>{book.price}</td>
                <td style={cellStyle}>{book.genre}</td>
                <td style={cellStyle}>{book.summary}</td>
                <td style={cellStyle}>{book.ISBN}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ComponentSlider components={newbooklist} className="bg-white/80" />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

const tableContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'top',
  justifyContent: 'center',
  height: 'auto',
  background: 'white',
  boxShadow: '0px 20px 20px rgba(225.83, 225.19, 248.63, 0.50)',
  borderRadius: 30,
};

const tableTitleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const bookTableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
};

const cellStyle = {
  border: '0px',
  padding: '10px',
  textAlign: 'center',
  left: 116,
  top: 4,
  color: 'black',
  fontSize: 13,
  fontFamily: 'Poppins',
  fontWeight: '600',
  wordWrap: 'break-word',
};

const headerCellStyle = {
  backgroundColor: '#abc4ed',
  color: '#22262b',
};

export default Products;
