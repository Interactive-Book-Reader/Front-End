import React, { useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import OtpInput from 'src/components/OTPInput/OtpInput';

const OTPVerification = () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const email = url.searchParams.get('email');
  const [otp, setOtp] = useState('');

  // Callback function to handle OTP changes
  const handleOtpChange = (value) => {
    setOtp(value);
    // You can add logic here to verify the OTP or perform other actions.
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/api/publisher/verifyOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: otp, publisherId: id }),
    });
    const responseData = await response.json();
    if (responseData.message === 'OTP is verified successfully.') {
      console.log(responseData);
      window.location.href = `/auth/login`;
    } else {
      console.log(responseData);
    }
  };

  const handleResend = async () => {
    const response = await fetch('http://localhost:3001/api/publisher/resendOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publisherId: id, email: email }),
    });
    const responseData = await response.json();
    if (responseData.message === 'OTP is sent successfully.') {
      console.log(responseData);
    } else {
      console.log(responseData);
    }
  };

  return (
    <PageContainer title="OTP Verification Page" description="this is OTP Verification Page">
      <div>
        <div className="App">
          <h1>OTP Verification</h1>
          <OtpInput numInputs={6} onChange={handleOtpChange} />
          <p>Entered OTP: {id}</p>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleResend}>Resend</button>
      </div>
    </PageContainer>
  );
};

export default OTPVerification;
