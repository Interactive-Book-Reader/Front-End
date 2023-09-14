import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Box } from '@mui/material';
import image from 'src/assets/images/home/bgImage1.jpg';
import image5 from 'src/assets/images/home/Book_rack.jpg';
import image2 from 'src/assets/images/home/rm347-sasi-banner-15.jpg';
import SendUsMessage from 'src/views/Home/SendUsMessage';
import ImageCarousel from 'src/views/Home/ImageCarousel';

const HomePage = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  return (
    <PageContainer title="Home Page" alt="home" description="this is Home Page">
      <Box>
        <Grid container>
          <Grid item xs={12} lg={13}>
            <div
              className="image-container"
              style={{
                ...imageContainerStyles,
                ...(isHovered && hoverStyles), // Apply hover styles when isHovered is true
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <Grid
                item
                xs={7}
                padding={10}
                style={{ fontWeight: 'bold', color: 'your-color-here', fontSize: '24px' }}
              >
                <h1>
                  Read like <br />
                  <br /> never before
                </h1>
              </Grid>

              <Grid item xs={8}></Grid>
              <Grid
                item
                xs={15}
                paddingLeft="20px"
                paddingTop="110px"
                style={{ color: 'black', fontSize: '20px' }}
              >
                Step into a world where reading comes to life! Welcome to our AR Interactive Book
                Reader, where pages turn into gateways to adventure. Immerse yourself in captivating
                stories, enhanced with stunning augmented reality experiences. With a simple scan,
                characters leap from the pages, landscapes unfold before your eyes, and mysteries
                unravel right in your hands. It's not just reading; it's an unforgettable journey.
                Discover the magic of books in a whole new dimension. Explore, interact, and read
                like never before!
              </Grid>
            </div>
          </Grid>
          <Grid marginTop="50px" marginBottom="50px">
            <ImageCarousel />
          </Grid>

          <div
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '40px',
              backgroundImage: `url(${image2})`,
              backgroundSize: 'cover',
              objectFit: 'cover',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.9)',
              transition: 'transform 0.1s',
              ...(isHovered && hoverStyles),
              padding: '20px',
              height: '600px', // Increase the height to your desired value
              width: '100%', // Increase the width to your desired value
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {/* Grid content here */}
          </div>

          <div>
            <SendUsMessage />
          </div>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default HomePage;

const imageContainerStyles = {
  backgroundImage: `url(${image})`,
  height: '550px',
  borderRadius: '40px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.9)',
  transition: 'transform 0.3s', // Add a smooth transition effect
};
const hoverStyles = {
  transform: 'scale(1.01)', // Increase the size by 10% when hovering
};
