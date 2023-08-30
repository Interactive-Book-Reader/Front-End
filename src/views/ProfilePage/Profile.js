import React,{useEffect,useState} from 'react';
import TextBox from 'src/components/TextBox/TextBox';
import YearPicker from 'src/components/DateField/YearPicker';
import MainTopic from 'src/components/Topic/MainTopic';
import SubTopic from 'src/components/Topic/SubTopic';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';

const Profile = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const id=jwt(token)._id;
  const [publisher, setPublisher] = useState({});

  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/publisher/getPublisher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });
    const data = await response.json();
    setPublisher(data.publisher);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <MainTopic text="General Informations" />
      <TextBox
        inputText="Name"
        label="Enter new name:"
        width="100%"
        type="text"
        isMultiline={false}
        defaultValue={publisher.name}
      />
      <TextBox
        inputText="Email Address"
        label="Enter new email address:"
        width="100%"
        type="text"
        isMultiline={false}
        defaultValue={publisher.email}
      />
      <TextBox
        inputText="Phone"
        label="Enter new phone number:"
        width="100%"
        type="text"
        isMultiline={false}
        defaultValue={publisher.phonenumber}
      />
      <TextBox
        inputText="Username"
        label="Enter new username:"
        width="100%"
        type="text"
        isMultiline={false}
        defaultValue={publisher.username}
      />
      <TextBox
        inputText="Password"
        label="Enter new password:"
        width="100%"
        type="password"
        isMultiline={false}
        defaultValue="######"
      />
      <SubTopic text="Year Stabilished:   " />
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
