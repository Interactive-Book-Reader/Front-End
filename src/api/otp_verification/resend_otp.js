export default async function resendOTP(id,email){
    const response = await fetch('http://localhost:3001/api/publisher/resendOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publisherId: id, email: email }),
    });
    const responseData = await response.json();

    return responseData;
}