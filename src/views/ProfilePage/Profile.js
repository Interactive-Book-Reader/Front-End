import { Typography,TextField } from '@mui/material';
import React from 'react';

const Profile = () => {
  return (
    <div
          className="mx-8 mx-8"
          style={{
              width: '800px',
              height: '500px',
              backgroundColor: '#F2F2F2',
              border: '2px solid black',
              borderRadius: '30px',
          }}
      ><div style={{
         width: '50%',
      }}>
        <Typography style={{
              fontSize: '30px',
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'justify',
              marginLeft: '40px',
              marginTop: '10px',
          }}>General information</Typography>
           <Typography variant="h7" component="div" sx={{ flexGrow: 1 }} style={{
                fontSize: '20px',
                color: 'black',
                textAlign: 'justify',
                marginLeft: '10px',
                marginTop: '10px',
           }}>First Name</Typography>
           <TextField id="outlined-basic" label="First Name" variant="outlined" />
      </div>          
    </div>
    
  );
};

export default Profile;
