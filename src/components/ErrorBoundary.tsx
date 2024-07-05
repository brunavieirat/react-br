import React, { useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [children]);

  const handleOnError = () => {
    setHasError(true);
  };

  if (hasError) {
    return <h1>Oops! Algo deu errado.</h1>;
  }

  return (
    <div onError={handleOnError}>
      {children}
    </div>
  );
};

export default ErrorBoundary;
