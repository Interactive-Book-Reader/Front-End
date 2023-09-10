export default async function verifyOTP(otp, id) {
  const response = await fetch('http://localhost:3001/api/publisher/verifyOTP', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ otp: otp, publisherId: id }),
  });
  const responseData = await response.json();

  return responseData;
}
