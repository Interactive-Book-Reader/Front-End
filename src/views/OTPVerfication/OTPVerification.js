import React, { useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import OtpInput from 'src/components/OTPInput/OtpInput';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');

  // Callback function to handle OTP changes
  const handleOtpChange = (value) => {
    setOtp(value);
    // You can add logic here to verify the OTP or perform other actions.
  };
  return (
    <PageContainer title="OTP Verification Page" description="this is OTP Verification Page">
      <div>
        <div className="App">
          <h1>OTP Verification</h1>
          <OtpInput numInputs={6} onChange={handleOtpChange} />
          <p>Entered OTP: {otp}</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default OTPVerification;
