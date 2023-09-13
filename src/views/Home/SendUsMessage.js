import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SendUsMessage(props) {
  const containerStyle = {
    display: 'flex',
    marginTop:20,
    flexDirection: 'row', // This sets the direction to horizontal
  };

  const viewStyle = {
    flex: 1,
    background: 'lightblue',
    padding: '10px',
    alignItems: 'center',

  };

  const [formData, setFormData] = useState({
    email: '',
    contactNo: '',
    message: '',
    name:'',
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
      <div style={viewStyle}>
       <div style={{padding:100}}>
       <h3>Contact Us</h3>
        <h2>Send us messages for any info.</h2>

        <h6>call for emergency to this number</h6>
        +91 9876543210

       </div>
 
      </div>

      {/* Second View */}
      <div style={viewStyle}>
      <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
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
        variant="outlined"
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
        variant="outlined"
        name="contactNo"
        type="tel"
        value={formData.contactNo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Message"
        variant="outlined"
        name="message"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        SEND
      </Button>
    </form>
      </div>
    </div>
  );
}

export default SendUsMessage;
