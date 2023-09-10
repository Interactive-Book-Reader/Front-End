export default async function getAllBooks(id){
    const response = await fetch('http://localhost:3001/api/book/show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();

    return data;
}