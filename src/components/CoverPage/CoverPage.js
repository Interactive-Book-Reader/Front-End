import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

const CoverPage = ({ title, author, photo, price,id}) => {
  return (
    <Grid container spacing={4}>
      <Grid item sm={12} md={4} lg={3}>
        <div style={{ height: '500px', width: '300px' }}>
<<<<<<< Updated upstream
          <Link
            to={`/bookdetails?id=${id}`}
          >
=======
          <Link to="/mybook">
>>>>>>> Stashed changes
            <img
              src={photo}
              alt="img"
              style={{
<<<<<<< Updated upstream
                border: '1px solid black',
                borderRadius: '10px',
                width: '300px',
                height: '300px',
=======
                border: '1px solid black', // Adds a black border
                borderRadius: '10px', // Adds corner radius
                width: '300px', // Sets width to 300px
                height: '300px', // Sets height to 300px
>>>>>>> Stashed changes
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
