import { useCallback } from 'react';

import { ContentBaseLayout } from '../../shared/layouts/ContentBaseLayout';
import { ListAdoptToolbar } from '../../shared/components';

import { Container } from './styles';

export const FindPets = () => {
  const handleSearch = useCallback(() => {
    console.log('handleSearch');
  }, []);

  const handleAdopt = useCallback(() => {
    console.log('handleAdopt');
  }, []);

  return (
    <ContentBaseLayout
      title="Adote seu amigo"
      toolbar={
        <ListAdoptToolbar
          handleSearch={handleSearch}
          handleAdopt={handleAdopt}
        />
      }
    >
      <Container>
        <h1>childre de adoção</h1>
      </Container>
    </ContentBaseLayout>
  );
};
