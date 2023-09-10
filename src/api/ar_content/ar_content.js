export default async function getBooks(id){
    const response = await fetch('http://localhost:3001/api/book/publisherbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publisher_id: id }),
    });
    const data = await response.json();
    return data;
}
