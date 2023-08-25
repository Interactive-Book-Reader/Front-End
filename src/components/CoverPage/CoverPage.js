import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

const CoverPage = ({ title, author, photo, price }) => {
  return (
    <Grid container spacing={4}>
      <Grid item sm={12} md={4} lg={3}>
        <div style={{ height: '400px', width: '300px' }}>
          <Link to="/mybook">
            <img
              src={photo}
              alt="img"
              style={{
                border: '3px solid black', // Adds a black border
                borderRadius: '40px', // Adds corner radius
                width: '300px', // Sets width to 300px
                height: '300px', // Sets height to 300px
              }}
            />
          </Link>
          <div style={{ height: '100px', width: '300px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Typography variant="h5" style={{ color: 'blue', marginBottom: '8px' }}>
                {title}
              </Typography>
              <Typography variant="h6" style={{ marginBottom: '4px' }}>
                {author}
              </Typography>
              <Typography variant="h6" style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                LKR{price}
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CoverPage;