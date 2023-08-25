import React from 'react';
import TextBox from 'src/components/TextBox/TextBox';
import YearPicker from 'src/components/DateField/YearPicker';
import MainTopic from 'src/components/Topic/MainTopic';
import SubTopic from 'src/components/Topic/SubTopic';

const Profile = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <MainTopic text="General Informations" />
      <TextBox
        inputText="Name"
        label="Enter the name:"
        width="100%"
        type="text"
        isMultiline={false}
      />
      <TextBox
        inputText="Email Address"
        label="name@gmail.com"
        width="100%"
        type="text"
        isMultiline={false}
      />
      <TextBox
        inputText="Phone"
        label="+94 77 004 2188"
        width="100%"
        type="text"
        isMultiline={false}
      />
      <TextBox
        inputText="Username"
        label="Enter the username:"
        width="100%"
        type="text"
        isMultiline={false}
      />
      <TextBox
        inputText="Password"
        label="Enter the password:"
        width="100%"
        type="password"
        isMultiline={false}
      />
      <SubTopic text="Date of Birth" />
      <YearPicker text="Date of Birth" />
      <TextBox
        inputText="Bio Data"
        label="Enter bio data:"
        width="100%"
        type="text"
        isMultiline={true}
      />
      <div>
        <h3>Image Upload</h3>
        <input type="file" accept="image/*" />
        <button>Upload</button>
      </div>
    </div>
  );
};

export default Profile;
