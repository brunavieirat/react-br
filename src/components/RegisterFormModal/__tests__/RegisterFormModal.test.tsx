// RegisterFormModal.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegisterFormModal from '../RegisterFormModal';

describe('RegisterFormModal Component', () => {
  it('renders correctly with initial data', () => {
    // Mock props
    const initialData = { name: 'John Doe', email: 'john.doe@example.com' };

    // Render the component with initial data
    render(<RegisterFormModal initialData={initialData} />);

    // Assert that the RegisterFormModal renders with the correct initial values
    expect(screen.getByLabelText('Nome')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john.doe@example.com');
  });
});
