import React,{useEffect,useState} from 'react';
import TextBox from 'src/components/TextBox/TextBox';
import YearPicker from 'src/components/DateField/YearPicker';
import MainTopic from 'src/components/Topic/MainTopic';
import SubTopic from 'src/components/Topic/SubTopic';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio_data, setBio_data] = useState('');
  const [year_stabilized, setYear_stabilized] = useState('');


  const handleNameChange = (newInputText) => {
    console.log(newInputText);
    setName(newInputText);
  };

  const handleEmailChange = (newInputText) => {
    console.log(newInputText);
    setEmail(newInputText);
  };

  const handlePhonenumberChange = (newInputText) => {
    console.log(newInputText);
    setPhonenumber(newInputText);
  };

  const handleUsernameChange = (newInputText) => {
    console.log(newInputText);
    setUsername(newInputText);
  };

  const handleBio_dataChange = (newInputText) => {
    console.log(newInputText);
    setBio_data(newInputText);
  };

  const handleYear_stabilizedChange = (newInputText) => {
    console.log(newInputText);
    setYear_stabilized(newInputText);
  };  

  const handlePasswordChange = (newInputText) => {
    console.log(newInputText);
    setPassword(newInputText);
  };

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
        onInputChange={handleNameChange}
      />
      <TextBox
        inputText="Email Address"
        label="Enter new email address:"
        width="100%"
        type="text"
        isMultiline={false}
        defaultValue={publisher.email}
        onInputChange={handleEmailChange}
      />
      <TextBox
        inputText="Phone"
        label="Enter new phone number:"
        width="100%"
        type="text"
        isMultiline={false}
        defaultValue={publisher.phonenumber}
        onInputChange={handlePhonenumberChange}
      />
      <TextBox
        inputText="Username"
        label="Enter new username:"
        width="100%"
        type="text"
        isMultiline={false}
        defaultValue={publisher.username}
        onInputChange={handleUsernameChange}
      />
      <TextBox
        inputText="Password"
        label="Enter new password:"
        width="100%"
        type="password"
        isMultiline={false}
        defaultValue="######"
        onInputChange={handlePasswordChange}
      />
      <SubTopic text={`Year Established:   ${publisher.year_stabilized}`} />
      <YearPicker text="Date of Birth" onInputChange={handleYear_stabilizedChange}/>
      <TextBox
        inputText="Bio Data"
        label="Enter bio data:"
        width="100%"
        type="text"
        isMultiline={true}
        defaultValue={publisher.bio_data}
        onInputChange={handleBio_dataChange}
      />
      <div>
        <h3>Image Upload</h3>
        <input type="file" accept="image/*" />
        <button>Upload</button>
      </div>
      <div>{name} {email} {password} {username} {bio_data} {phonenumber} {year_stabilized}</div>
      <div>
        <button>Rename</button>
      </div>
    </div>
  );
};

export default Profile;
