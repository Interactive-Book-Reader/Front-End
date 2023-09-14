import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Box } from '@mui/material';
import image from 'src/assets/images/home/bgImage1.jpg';
import image1 from 'src/assets/images/home/img1.PNG';
import image2 from 'src/assets/images/home/img2.PNG';
import image3 from 'src/assets/images/home/img3.PNG';
import image4 from 'src/assets/images/home/img2.PNG';
import image5 from 'src/assets/images/home/Book_rack.jpg';
import ComponentSlider from 'src/components/Slider/ComponentSlider';
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
  const images = [
    `${image1}`,
    `${image2}`,
    `${image3}`,
    `${image4}`,

    // Add more image URLs here
  ];

  const newImageList = images.map((image, index) => <img src={image} alt="new cover" />);

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
          <Grid marginTop="50px"  marginBottom="50px"><ImageCarousel/></Grid>
          
          <div
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '40px',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.9)',
              transition: 'transform 0.1s',
              ...(isHovered && hoverStyles),
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            padding="20px"
          >
            <img
              src={image5}
              alt="new pic"
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '40px' }}
            />
          </div>
          <div>
            <SendUsMessage></SendUsMessage>
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
