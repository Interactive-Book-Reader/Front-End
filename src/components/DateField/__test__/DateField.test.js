import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateField from '../DateField';

test('renders DateField component with label and width', () => {
  render(<DateField text="Select a Date" width="400px" />);

  // Check if the label and input are rendered
  const labelElement = screen.getByText('Select a Date');
  const inputElement = screen.getByRole('textbox', { name: 'Select a Date' });

  expect(labelElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();

  // Check if the input has the specified width
  expect(inputElement).toHaveStyle('width: 400px');
});

// You can add more test cases as needed
