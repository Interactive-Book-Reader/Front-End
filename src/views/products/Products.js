import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import CoverPage from '../../components/CoverPage/CoverPage';
import ComponentSlider from '../../components/Slider/ComponentSlider';
import { getAuthToken } from '../authentication/auth/AuthLogin';
import jwt from 'jwt-decode';
import Checkbox from '../../components/checkbox/checkbox';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import SearchBar from 'src/components/SearchBar/SearchBar';
import publisherBook from 'src/api/products/publisher_book';

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
  };

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
        <SearchBar callback={handleSearch} />
        <div
          style={{
            marginBottom: '10px',
            marginLeft: '25px',
          }}
        >
          <h4>Filter Genre</h4>
          {Object.entries(genres).map(([genre, checked]) => (
            <Checkbox
              key={genre}
              label={genre}
              checked={checked}
              onChange={() => handleGenreChange(genre)}
            />
          ))}
        </div>
        <table style={bookTableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Title</th>
              <th style={headerCellStyle}>Author</th>
              <th style={headerCellStyle}>Price</th>
              <th style={headerCellStyle}>Genre</th>
              <th style={headerCellStyle}>Summary</th>
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
                  <td style={cellStyle}>{book.summary}</td>
                  <td style={cellStyle}>{book.ISBN}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
  justifyContent: 'center',
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
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
};

const cellStyle = {
  border: '0px',
  padding: '10px',
  textAlign: 'center',
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
};

export default Products;
