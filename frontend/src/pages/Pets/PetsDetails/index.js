import { useCallback, useRef, useState, useEffect } from 'react'
import { FiCamera, FiEdit } from 'react-icons/fi';

import { useLocation, useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import getValidationErrors from '../../../shared/utils/getValidationErrors';
import { ContentBaseLayout } from '../../../shared/layouts/ContentBaseLayout';
import { FormActions, Input, Select, Button } from '../../../shared/components'
import { useToast } from '../../../shared/context/ToastContext'
import { createPet, updateAvatarPet, getPetDetails, editPet } from '../../../api/petsApi'

import { Container, FormContent, PetContainer } from './styles';
import { environment } from '../../../shared/environments';

export const PetsDetails = () => {
  const formRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast()

  const { id } = useParams();
  const { option } = location.state;

  const [petPicture, setPetPicture] = useState('')
  const [petPicturePayload, setPetPicturePayload] = useState()
  const [pet, setPet] = useState()

  const handleBack = useCallback(() => {
    navigate('/pets');
  }, [navigate]);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        age: Yup.number().required("Idade é obrigatória"),
        name: Yup.string().required("Nome é obrigatório"),
        port: Yup.string().required("Porte é obrigatório"),
        race: Yup.string().required("Raça é obrigatória"),
        type: Yup.string().required("O Tipo é obrigatório"),
        castrated: Yup.string().required("Se é ou não castrado é obrigatório")
      })

      await schema.validate(data, { abortEarly: false })

      let pet;
      switch (option) {
        case 1: {
          pet = await createPet(data)
          break;
        }

        case 2: {
          Object.assign(data, { id })

          pet = await editPet(data)
          break;
        }

        default:
      }

      if (petPicturePayload) {
        await updateAvatarPet({ id: option === 1 ? pet.id : id, data: petPicturePayload })
      }

      addToast({
        type: 'success',
        title: 'Pet Salvo !',
        description: 'Pet Salvo com sucesso !!'
      });

      navigate('/pets')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao cadastrar',
        description: 'Erro no cadastro, verifique seus dados',
      });
    }
  }, [addToast, petPicturePayload, navigate, id, option]);

  const handlePictureChange = useCallback((event) => {
    setPetPicture(URL.createObjectURL(event.target.files[0]))

    const data = new FormData();
    data.append('picture', event.target.files[0])
    setPetPicturePayload(data);
  }, [])

  const handleGetPetDetails = useCallback(async () => {
    const result = await getPetDetails(id)

    setPetPicture(environment.API_URL + '/files/' + result.picture);

    Object.assign(result, {
      castrated: result.castrated ? { value: true, label: 'Sim' } : { value: false, label: 'Não' }
    })

    setPet(result)
  }, [id])

  useEffect(() => {
    if (id !== 'new') {
      handleGetPetDetails()
    }
  }, [handleGetPetDetails, id])

  return (
    <ContentBaseLayout title={option === 1 ? 'Cadastro de um novo pet' : 'Detalhes do pet'} toolbar={<FormActions handleBack={handleBack} />}>
      <Container>
        <h1>Formulário de cadastro</h1>

        <FormContent>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={pet}>
            <Input
              name="name"
              icon={FiEdit}
              type="text"
              placeholder="Digite o nome do seu pet"
              disabled={option === 4 ? true : false}
            />

            <Input
              name="age"
              icon={FiEdit}
              type="number"
              placeholder="Digite a idade do seu pet"
              disabled={option === 4 ? true : false}
            />

            <Input
              name="race"
              icon={FiEdit}
              type="text"
              placeholder="Digite a raça do seu pet"
              disabled={option === 4 ? true : false}
            />

            {option !== 4 ? (
              <Select name="castrated" placeholder="Castrado ?"
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' }
                ]}
                disabled={option === 4 ? true : false}
              />
            ) : (
              <Input
                name="castrated"
                icon={FiEdit}
                type="text"
                value={pet?.castrated.value ? 'Castrado' : 'Não Castrado'}
                placeholder="Digite a raça do seu pet"
                disabled={option === 4 ? true : false}
              />
            )}


            <Input
              name="port"
              icon={FiEdit}
              type="text"
              placeholder="Digite o porte do seu pet"
              disabled={option === 4 ? true : false}
            />

            <Input
              name="type"
              icon={FiEdit}
              type="text"
              placeholder="Digite o tipo do seu pet"
              disabled={option === 4 ? true : false}
            />

            <Button type="submit" style={{ marginTop: '16px' }}>Salvar</Button>
          </Form>

          <PetContainer>
            {petPicture && <img src={petPicture} alt="Pet" />}

            <label htmlFor="picture">
              <FiCamera />

              <input type="file" id="picture" onChange={handlePictureChange} />
            </label>
          </PetContainer>
        </FormContent>
      </Container>
    </ContentBaseLayout>

  )
}