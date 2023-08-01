import './App.css';
import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Get the selected file from the input element
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can perform any action with the selectedFile here, such as sending it to the server.

    // For demonstration purposes, let's log the file details to the console.
    if (selectedFile) {
      console.log('Selected File:', selectedFile.name);
    } else {
      console.log('No file selected.');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pdfFile">Select a PDF file:</label>
        <input
          type="file"
          id="pdfFile"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default App;
