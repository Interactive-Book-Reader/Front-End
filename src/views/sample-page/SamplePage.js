import React, { useState } from 'react';

const SamplePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile); // Use "pdfFile" as the key name for the uploaded file

    try {
      const response = await fetch('http://localhost:3001/api/insert', {
        // Replace "/upload" with your server-side endpoint for PDF upload
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert(response.statusText);
      } else {
        alert('no response');
      }
    } catch (error) {
      console.error('Error uploading the PDF:', error);
    }
  };

  return (
    <div>
      <h2>PDF Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default SamplePage;
