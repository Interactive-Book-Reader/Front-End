import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import CoverPage from '../../components/CoverPage/CoverPage';
import ComponentSlider from '../../components/Slider/ComponentSlider';
import { getAuthToken } from '../authentication/auth/AuthLogin';
import jwt from 'jwt-decode';

import publisherBook from 'src/api/products/publisher_book';
import { DataGrid } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

const Products = () => {
  const [booklist, setBooklist] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo(
    () => [
      { field: 'title', headerName: 'Title', width: 350 },
      { field: 'author', headerName: 'Author', width: 300 },
      { field: 'price', headerName: 'Price', width: 80 },
      { field: 'genre', headerName: 'Genre', width: 250 },
      { field: 'ISBN', headerName: 'ISBN', width: 80 },
    ],
    [],
  );

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      const id = jwt(token)._id;
      const data = await publisherBook(id);
      setBooklist(data.response);
      console.log(data.response);
    } catch (err) {
      window.location.href = '/auth/login';
    }
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
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage books
        </Typography>
        <DataGrid
          columns={columns}
          rows={booklist}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection
          getRowId={(book) => book._id}
          getRowSpacing={params=>({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })
        }
        sx={{
          [`& .{gridClasses.row}`]: {
            bgcolor : grey[900],
          },
        }}
        />
      </Box>

      <Box
        style={{
          paddingTop: '70px',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ComponentSlider components={newbooklist} className="bg-white/80" />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Products;
