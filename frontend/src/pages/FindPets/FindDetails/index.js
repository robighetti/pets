import { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiCamera, FiEdit, FiSearch } from 'react-icons/fi';

import { Button, FormActions, Input, SearchPets } from '../../../shared/components';
import { ContentBaseLayout } from '../../../shared/layouts/ContentBaseLayout'
import { Container, FormContent, PetContainer, SearchButton } from './styles'

export const FindDetails = () => {
  const formRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const { option } = location.state;

  const [pet, setPet] = useState({
    pet: {
      id: null,
      name: null
    },
    donator: {
      id: null,
      name: null
    },
    date: new Date()
  });

  const [petPicture, setPetPicture] = useState('')
  const [search, setSearch] = useState(true)

  const handleBack = useCallback(() => {
    navigate('/find-pets');
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    console.log('ok')
  }, [])

  return (
    <ContentBaseLayout title={option === 1 ? 'Adotando um pet' : 'Detalhes da adoção'} toolbar={<FormActions handleBack={handleBack} />}>
      <Container>
        {search && (<SearchPets />)}

        <h1>Formulário de cadastro</h1>

        <FormContent>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={pet}>

            <SearchButton>
              <Input
                name="name"
                icon={FiEdit}
                type="text"
                placeholder="Digite o nome do seu pet"
                disabled
                style={{
                  width: '250px'
                }}
              />

              <button type="button"><FiSearch /></button>
            </SearchButton>

            <Input
              name="date"
              icon={FiEdit}
              type="text"
              placeholder="Digite o nome do seu pet"
              disabled
            />

            <Input
              name="donator"
              icon={FiEdit}
              type="text"
              placeholder="Digite o nome do seu pet"
              disabled
            />

            <Button type="submit" style={{ marginTop: '16px' }}>Salvar</Button>
          </Form>

          <PetContainer>
            {petPicture && <img src={petPicture} alt="Pet" />}
          </PetContainer>
        </FormContent>
      </Container>
    </ContentBaseLayout>
  )
}