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
      <div>
        <h2>{publisher.name}</h2>
      </div>
    </div>
  );
};

export default Profile;
