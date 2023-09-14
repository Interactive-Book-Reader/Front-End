import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PurpleButton from '../';

describe('PurpleButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<PurpleButton label="Click me" />);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeTruthy();
  });

  it('handles onClick event', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<PurpleButton label="Click me" onClick={onClickMock} />);
    const buttonElement = getByText('Click me');
    
    fireEvent.press(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
