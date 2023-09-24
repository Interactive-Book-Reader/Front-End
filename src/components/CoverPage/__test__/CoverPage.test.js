import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter if you use Link
import CoverPage from '../CoverPage';

const mockData = {
  title: 'Sample Book',
  author: 'John Doe',
  photo: 'sample.jpg',
  price: 19.99,
  id: 1,
};

describe(CoverPage, () => {
  it('should render correctly', () => {
    const { getByTestId, getByAltText } = render(
      <Router>
        <CoverPage {...mockData} />
      </Router>
    );
    const bookname=getByTestId('Sample Book').textContent;
    const authorname=getByTestId('John Doe').textContent;
    const price=getByTestId('LKR19.99').textContent;
    expect(bookname).toBe('Sample Book');
    expect(authorname).toBe('John Doe');
    expect(price).toBe('LKR19.99');
  });
});
// You can add more test cases as needed
