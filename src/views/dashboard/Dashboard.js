import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import CoverPage from '../../components/CoverPage/CoverPage';
import ComponentSlider from '../../components/ComponentSlider/ComponentSlider';
// import jwt from 'jsonwebtoken';

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    
    // Sample secret key (replace with your actual secret key)
    // const secretKey = 'verySecretValue';
    console.log(token);

    // try {
    //   // Verify and decode the JWT token
    //   const decodedToken = jwt.decodedToken(token, secretKey);

    //   // Now you can access data from the payload
    //   console.log('Decoded Token:', decodedToken);

    //   // Example: Accessing a specific claim (replace 'claimName' with the actual claim name)
    //   const username= decodedToken.username;
    //   console.log('Username:', username);
    // } catch (error) {
    //   console.error('Error decoding token:', error);
    // }
  }, [location.search]);

  
  const newbooklist = [
    <CoverPage
      title="The Cat in the Hat"
      author="Dr. Seuss"
      price="1499"
      photo="https://ia803205.us.archive.org/BookReader/BookReaderPreview.php?id=catinhat00seus&subPrefix=catinhat00seus&itemPath=/11/items/catinhat00seus&server=ia803205.us.archive.org&page=leaf1&fail=preview&&scale=4&rotate=0"
    />,
    <CoverPage
      title="Where the Wild Things Are"
      author="Maurice Sendak"
      price="1899"
      photo="https://2.bp.blogspot.com/-rfAzdnPXLac/VbpCPf5cjQI/AAAAAAAAEkg/4f9liocOs5Y/s1600/things-are_page_201.jpg"
    />,
    <CoverPage
      title="Goodnight Moon"
      author="Margaret Wise Brown"
      price="1299"
      photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12RzIyyQOBEcwqqVtxfUk3aQqwNBVcbvDSw&usqp=CAU"
    />,
    <CoverPage
      title="The Cat in the Hat"
      author="Dr. Seuss"
      price="1499"
      photo="https://ia803205.us.archive.org/BookReader/BookReaderPreview.php?id=catinhat00seus&subPrefix=catinhat00seus&itemPath=/11/items/catinhat00seus&server=ia803205.us.archive.org&page=leaf1&fail=preview&&scale=4&rotate=0"
    />,
    <CoverPage
      title="Where the Wild Things Are"
      author="Maurice Sendak"
      price="1899"
      photo="https://2.bp.blogspot.com/-rfAzdnPXLac/VbpCPf5cjQI/AAAAAAAAEkg/4f9liocOs5Y/s1600/things-are_page_201.jpg"
    />,
    <CoverPage
      title="Goodnight Moon"
      author="Margaret Wise Brown"
      price="1299"
      photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12RzIyyQOBEcwqqVtxfUk3aQqwNBVcbvDSw&usqp=CAU"
    />,
  ];
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
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

export default Dashboard;
