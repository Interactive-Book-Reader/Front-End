import React, { useEffect, useState, useRef } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import getDetails from 'src/api/customers/getDetails';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';

const Customers = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const id = jwt(token)._id;
      const data = await getDetails(id);
      setData(data.data);
      console.log(data);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      pdf.save('Customer.pdf');
    });
  };

  return (
    <PageContainer title="Customer" description="this is Customer Page">
      <div style={tableContainerStyle} ref={pdfRef}>
        <h2 style={tableTitleStyle}>Customer List:Read Books</h2>

        <table style={bookTableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Name</th>
              <th style={headerCellStyle}>Username</th>
              <th style={headerCellStyle}>Title</th>
              <th style={headerCellStyle}>Genre</th>
              <th style={headerCellStyle}>ISBN</th>
              <th style={headerCellStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((detail, index) => (
              <tr key={index}>
                <td style={cellStyle}>{detail.user_details.name}</td>
                <td style={cellStyle}>{detail.user_details.username}</td>
                <td style={cellStyle}>{detail.book_details.title}</td>
                <td style={cellStyle}>{detail.book_details.genre}</td>
                <td style={cellStyle}>{detail.book_details.ISBN}</td>
                <td style={cellStyle}>{detail.book_details.price}</td>
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
    </PageContainer>
  );
};

export default Customers;

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
