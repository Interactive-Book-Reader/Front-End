import { Typography } from '@mui/material';
import React from 'react';
import TextBox from 'src/components/TextBox/TextBox';
import DateField from 'src/components/DateField/DateField';
import DropDownList from 'src/components/DropDownList/DropDownList';

const Profile = () => {
  return (
    <>
      <Typography
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'justify',
          marginLeft: '40px',
          marginTop: '10px',
        }}
      >
        General information
      </Typography>
      <div style={{ display: 'flex', paddingTop: '10px' }}>
        <TextBox inputText="First Name" label="Enter the first name:" width="350px" />
        <TextBox inputText="Last Name" label="Enter the last name:" width="350px" />
      </div>
      <div style={{ display: 'flex', paddingTop: '10px' }}>
        <TextBox inputText="Email Address" label="name@gmail.com" width="350px" />
        <TextBox inputText="Phone" label="+94 77 004 2188" width="350px" />
      </div>
      <div style={{ width: '350px', paddingTop: '10px', display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h7"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: '20px',
            color: 'black',
            textAlign: 'justify',
            marginLeft: '10px',
            marginTop: '10px',
          }}
        >
          Date of Birth
        </Typography>
        <DateField text="Date of Birth" width="350px" />
      </div>
      <div style={{alignItems:'center'}}>

      </div>
      <DropDownList />
    </>
  );
};

export default Profile;
