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
    <CoverPage title={book.title} author={book.author} price={book.price} photo={book.coverpage} />
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
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
};

const tableTitleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const bookTableStyle = {
  borderCollapse: 'collapse',
  width: '80%',
  maxWidth: '800px',
  margin: '0 auto',
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
};

const headerCellStyle = {
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
};

export default Products;
