import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter if you use Link
import CoverPage from '..CoverPage';

const mockData = {
  title: 'Sample Book',
  author: 'John Doe',
  photo: 'sample.jpg',
  price: 19.99,
  id: 1,
};

test('renders CoverPage component with provided data', () => {
  const { getByText, getByAltText } = render(
    <Router>
      <CoverPage {...mockData} />
    </Router>
  );

  const titleElement = getByText('Sample Book');
  const authorElement = getByText('John Doe');
  const priceElement = getByText('LKR19.99');
  const imageElement = getByAltText('img');

  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
});

// You can add more test cases as needed
