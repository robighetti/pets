import { useCallback } from 'react';

import { ContentBaseLayout } from '../../shared/layouts/ContentBaseLayout';

import { ListToolbar } from '../../shared/components';

import { Container } from './styles';

export const Pets = () => {
  const handleSearch = useCallback(() => {
    console.log('PETS - handleSearch');
  }, []);

  const handleNew = useCallback(() => {
    console.log('PETS - handleNew');
  }, []);

  return (
    <ContentBaseLayout
      title="Cadastro de pets"
      toolbar={
        <ListToolbar handleSearch={handleSearch} handleNew={handleNew} />
      }
    >
      <Container>
        {/* children */}
        <span>Aqui é o children</span>
      </Container>
    </ContentBaseLayout>
  );
};
