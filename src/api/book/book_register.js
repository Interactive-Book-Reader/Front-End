export default async function registerBook(jsonData){
    const response = await fetch('http://localhost:3001/api/book/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

    return response;
}