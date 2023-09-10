export default async function updatePublisher(updateData){
    const response = await fetch('http://localhost:3001/api/publisher/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const responseData = await response.json();

    return responseData;
}