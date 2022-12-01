import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormActions } from '../../../shared/components';
import { ContentBaseLayout } from '../../../shared/layouts/ContentBaseLayout'
import { Container } from './styles'

export const FindDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const { option } = location.state;

  const handleBack = useCallback(() => {
    navigate('/find-pets');
  }, [navigate]);

  return (
    <ContentBaseLayout title={option === 1 ? 'Adotando um pet' : 'Detalhes da adoção'} toolbar={<FormActions handleBack={handleBack} />}>
      <Container>
        <h1>Formulário de cadastro</h1>
      </Container>
    </ContentBaseLayout>

  )
}