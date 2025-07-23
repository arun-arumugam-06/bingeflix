/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../pages/Auth';
import { AuthProvider } from '../hooks/useAuth';

describe('Auth Page', () => {
  it('renders sign in and sign up forms', () => {
    render(
      <AuthProvider>
        <Auth />
      </AuthProvider>
    );
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', () => {
    render(
      <AuthProvider>
        <Auth />
      </AuthProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Sign In'));
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it('shows validation error for short password', () => {
    render(
      <AuthProvider>
        <Auth />
      </AuthProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Sign In'));
    expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
  });
}); 