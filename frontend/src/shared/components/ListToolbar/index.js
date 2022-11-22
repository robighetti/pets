import { useTheme } from 'styled-components';
import { Form } from '@unform/web';
import { FiSearch, FiCheck } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';

import { Input, Button } from '../';

import { Container } from './styles';

export const ListToolbar = ({ handleSearch, handleNew }) => {
  const theme = useTheme();

  const buttonStyles = {
    background: theme.primary_light,
    color: theme.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '150px',
    border: `1px solid ${theme.primary}`,
  };

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Input name="search" type="text" icon={FiSearch} />
        <Button type="submit">
          <FiCheck />
        </Button>
      </Form>

      <Button type="button" style={buttonStyles} onClick={() => handleNew('new', 1)}>
        <MdAdd size={24} style={{ marginRight: '16px' }} /> Novo
      </Button>
    </Container>
  );
};
