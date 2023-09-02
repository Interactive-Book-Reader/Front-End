import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Box } from '@mui/material';
import image from 'src/assets/images/home/bgImage1.jpg';
import image1 from 'src/assets/images/home/img1.PNG';
import image2 from 'src/assets/images/home/img2.PNG';
import image3 from 'src/assets/images/home/img3.PNG';
import image4 from 'src/assets/images/home/img2.PNG';
import HoverCarousel from "hover-carousel";

const HomePage = () => {

  const images = [
    
    `${image1}`,
    `${image2}`,
    `${image3}`,
    `${image4}`,
    
    // Add more image URLs here
  ];
  return (
    <PageContainer title="Home Page" description="this is Home Page">
      <Box>
        <Grid container >
      
            <Grid item xs ={12}>
            <div style={{ backgroundImage:`url(${image})`, height: '300px' }}>
      
                <Grid item xs={5} padding={5} >
                  
                  <h1>Read like <br/><br/> never before</h1>
                </Grid>
                <Grid item xs={8} >

                </Grid>
                <Grid item xs = {12}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris nisl, tempus quis dapibus a, lacinia eget leo. Aenean fermentum egestas mattis. In fringilla dui libero, ut vehicula diam faucibus id. Morbi sed consequat mauris. Suspendisse vitae mi sit amet quam semper tincidunt ut sed ipsum. Sed ultricies, leo quis tincidunt blandit, purus lorem malesuada elit, nec facilisis tortor lacus vel odio. Sed quis condimentum diam. Quisque massa sem, pharetra id arcu eu, placerat vulputate risus.
                </Grid>
                </div>
              
            </Grid>
            <Grid item xs ={12}>
              <div style={{height:'300px'}} >
      <HoverCarousel images={images} />
    </div>
              </Grid>

        </Grid>
      </Box>
    
    </PageContainer>
  );
};

export default HomePage;


