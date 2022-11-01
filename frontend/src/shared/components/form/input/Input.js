import { useField } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import { Container, Error } from './styles';

export const Input = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField, error, defaultValue } = useField(name);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        type="text"
        {...rest}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color={theme.error_title} size={20} />
        </Error>
      )}
    </Container>
  );
};
