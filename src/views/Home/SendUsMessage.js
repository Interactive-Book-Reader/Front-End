import React, { useState } from 'react';
import { Typography, TextField } from '@mui/material';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import image from 'src/assets/images/home/8.jpg'

function SendUsMessage(props) {
  const containerStyle = {
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.9)',
    borderRadius: '40px',
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row', // This sets the direction to horizontal
    backgroundImage: `url(${image})`, // Replace "image" with the variable containing your image path or URL
    backgroundSize: 'cover', // The image will cover the entire container
    objectFit: 'cover',
  };
  

  const viewStyle = {
    padding: '30px',
    paddingLeft: '30px',
    alignItems: 'center',
  };

  const [formData, setFormData] = useState({
    email: '',
    contactNo: '',
    message: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server
    console.log(formData);
  };

  return (
    <div style={containerStyle}>
      {/* First View */}
      <div style={{ ...viewStyle, borderRadius: '40px 0 0 40px' }}>
        <div style={{ padding: 20 , paddingTop:'40px'}}>
          <Typography style={{fontSize: '25px',fontWeight:'bold' ,paddingTop:'20px', alignContent:'center'}} >Contact us</Typography>
          <Typography style={{fontSize: '35px',fontWeight:'bold' ,paddingTop:'20px' ,alignContent:'center'}}>Send us messages </Typography>
          <Typography style={{fontSize: '35px',fontWeight:'bold' ,paddingTop:'20px' ,alignContent:'center'}}>for any info.</Typography>
          <Typography style={{fontSize: '20px',paddingTop:'20px' ,alignContent:'center'}}>call us for any emergency to this number</Typography>
          <Typography style={{fontSize: '20px',paddingTop:'20px' ,alignContent:'center'}}>+91 9876543210</Typography>
        </div>
      </div>

      {/* Second View */}
      <div style={{ ...viewStyle,width:'65%', borderRadius: '0 40px 40px 0' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="standard"
            name="name"
            type="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            variant="standard"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Contact Number"
            variant="standard"
            name="contactNo"
            type="tel"
            value={formData.contactNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            variant="standard"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <PurpleButton label="Send">
            SEND
          </PurpleButton>
        </form>
      </div>
    </div>
  );
}

export default SendUsMessage;
