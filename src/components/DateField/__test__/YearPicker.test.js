import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import YearPicker from '../YearPicker';

test('renders YearPicker component with label and output', () => {
  const onInputChange = jest.fn();
  render(<YearPicker label="Select a Year" onInputChange={onInputChange} output="2022" />);

  // Check if the label and output are rendered
  const labelElement = screen.getByText('Select a Year');
  const outputElement = screen.getByText('Year Stablished: 2022');

  expect(labelElement).toBeInTheDocument();
  expect(outputElement).toBeInTheDocument();
});

test('handles year selection and input change', () => {
  const onInputChange = jest.fn();
  render(<YearPicker label="Select a Year" onInputChange={onInputChange} output="2022" />);

  // Find and click on the DatePicker input
  const datePickerInput = screen.getByLabelText('Select a Year');
  fireEvent.click(datePickerInput);

  // Find and select a year from the DatePicker
  const yearElement = screen.getByText('2023');
  fireEvent.click(yearElement);

  // Verify that the input change function was called with the selected year
  expect(onInputChange).toHaveBeenCalledWith('2023');
});

// You can add more test cases as needed
