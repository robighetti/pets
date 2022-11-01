import { createContext, useCallback, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import { toast, ToastContainer } from 'react-toastify';

import { Container } from './styles';
import './styles.css';

const ToastContext = createContext({});

const ToastProvider = ({ children }) => {
  const addToast = useCallback(message => {
    const { type, title, description } = message;

    const Message = () => (
      <Container>
        <strong>{title}</strong>
        <span>{description}</span>
      </Container>
    );

    const icons = {
      error: '🤬',
      success: '🤗',
      warn: '😬',
      info: '🤯',
    };

    toast[type](<Message />, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: uuid(),
      icon: icons[type],
    });
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer autoClose={3000} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
