import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import CoverPage from '../../components/CoverPage/CoverPage';
import ComponentSlider from '../../components/Slider/ComponentSlider';
import { getAuthToken } from '../authentication/auth/AuthLogin';
import jwt from 'jwt-decode';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PurpleButton from 'src/components/Buttons/PurpleButton';

import publisherBook from 'src/api/products/publisher_book';
import Autosuggest from 'react-autosuggest';

const Products = () => {
  const [booklist, setBooklist] = useState([]);

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 50;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('report.pdf');
    });
  };
  // eslint-disable-next-line no-unused-vars
  const [searchValue, setSearchValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  // Initialize suggestions with some sample data

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      const id = jwt(token)._id;
      const data = await publisherBook(id);
      setBooklist(data.response);
      setFilteredBooks(data.response);
      console.log(data.response);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchValue(query);
    filterBooks(query);
    setSuggestions(getSuggestions(query));
  };
  //Suggesting titles while search
  // const suggestionData = [booklist.title];
  // Assuming booklist is an array of objects with a 'title' property
  const suggestionData = booklist.map((book) => book.title);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestionData.filter((suggestion) => suggestion.toLowerCase().startsWith(inputValue));
  };

  const renderSuggestion = (suggestion) => (
    <div style={{ padding: '8px 0', borderBottom: '1px solid #ccc', cursor: 'pointer' }}>
      {suggestion}
    </div>
  );

  const [genres, setGenres] = useState({
    Adventure: false,
    Mystery: false,
    Poetry: false,
    'Non-Fiction': false,
    'Fairy Tales and Forklore': false,
    'Animal Stories': false,
  });
  const handleGenreChange = (genre) => {
    setGenres({ ...genres, [genre]: !genres[genre] });
  };

  const filterBooks = (query) => {
    if (!query) {
      // If the search query is empty, show all books
      setFilteredBooks(booklist);
    } else {
      const processedQuery = query.replace(/&/g, 'and');
      // Filter books by title or author or ISBN containing the search query (case-insensitive)
      const filtered = booklist.filter(
        (book) =>
          book.title.toLowerCase().includes(processedQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(processedQuery.toLowerCase()) ||
          book.ISBN.toLowerCase().includes(processedQuery.toLowerCase()),
      );
      setFilteredBooks(filtered);
    }
  };
  const CheckboxedBooks = booklist.filter((book) => {
    return (
      (!genres.Adventure || book.genre === 'Adventure') &&
      (!genres.Mystery || book.genre === 'Mystery') &&
      (!genres['Non-Fiction'] || book.genre === 'Non-Fiction') &&
      (!genres['Animal Stories'] || book.genre === 'Animal Stories') &&
      (!genres['Fairy Tales and Forklore'] || book.genre === 'Fairy Tales and Forklore') &&
      (!genres.Poetry || book.genre === 'Poetry')
    );
  });
  const newbooklist = filteredBooks
    .filter((book) => CheckboxedBooks.includes(book))
    .map((book, index) => (
      <CoverPage
        title={book.title}
        author={book.author}
        price={book.price}
        photo={book.coverpage}
        id={book._id}
      />
    ));

  return (
    <PageContainer title="Products" description="this is Products">
      <div style={tableContainerStyle} ref={pdfRef}>
        <h2 style={tableTitleStyle}>Book List</h2>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Search...',
            value: searchValue,
            onChange: (event, { newValue }) => handleSearch(newValue),
            style: {
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
              borderRadius: '4px', // Rounded corners
              padding: '8px 12px', // Adjust padding
              fontSize: '16px', // Adjust font size
              width: '80%', // Take full width
              backgroundColor: '#f5f5f5', // Background color
              color: '#333', // Text color
              justifySelf: 'center',
              marginLeft: '100px',
            },
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <div style={filterBox}>
            {' '}
            <h4 style={{ marginLeft: '40px' }}>Filter Genre</h4>
            {Object.entries(genres).map(([genre, checked]) => (
              <label
                key={genre}
                style={{
                  display: 'block',
                  alignItems: 'center',
                  margin: '8px 0',
                  marginLeft: '40px',
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleGenreChange(genre)}
                  style={{ margin: '0 8px 0 0' }}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>

          <table style={bookTableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Title</th>
                <th style={headerCellStyle}>Author</th>
                <th style={headerCellStyle}>Price</th>
                <th style={headerCellStyle}>Genre</th>
                {/* <th style={headerCellStyle}>Summary</th> */}
                <th style={headerCellStyle}>ISBN</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks
                .filter((book) => CheckboxedBooks.includes(book))
                .map((book, index) => (
                  <tr key={index}>
                    <td style={cellStyle}>{book.title}</td>
                    <td style={cellStyle}>{book.author}</td>
                    <td style={cellStyle}>{book.price}</td>
                    <td style={cellStyle}>{book.genre}</td>
                    {/* <td style={cellStyle}>{book.summary}</td> */}
                    <td style={cellStyle}>{book.ISBN}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'right',
          marginTop: '10px',
        }}
      >
        <PurpleButton label="Download report" onClick={downloadPDF} />
      </div>

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ComponentSlider components={newbooklist} className="bg-white/80" />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
const tableContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'top',
  justifyContent: 'top',
  height: 'auto',
  background: 'white',
  boxShadow: '0px 20px 20px rgba(225.83, 225.19, 248.63, 0.50)',
  borderRadius: 30,
};

const tableTitleStyle = {
  fontSize: '24px',
  textAlign: 'center',
};

const bookTableStyle = {
  borderCollapse: 'collapse',
  width: '70%',
  maxWidth: '800px',
  margin: '0 auto',
};

const cellStyle = {
  border: '0px',
  padding: '10px',
  textAlign: 'left',
  left: 116,
  top: 4,
  color: 'black',
  fontSize: 13,
  fontFamily: 'Poppins',
  fontWeight: '600',
  wordWrap: 'break-word',
};

const headerCellStyle = {
  backgroundColor: '#abc4ed',
  color: '#22262b',
  textAlign: 'left',
  left: 116,
};

const filterBox = {
  display: 'flex',
  flexDirection: 'column',
  justifySelf: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f5f5f5',
  width: '20%', // Adjust the width as needed
  marginLeft: '20px', // Adjust the left margin as needed
};

export default Products;
