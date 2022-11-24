import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

import { ContentBaseLayout } from '../../shared/layouts/ContentBaseLayout';

import { ListToolbar, DeleteModal } from '../../shared/components';

import { getPets, deletePet } from '../../api/petsApi';
import { environment } from '../../shared/environments';
import { useToast } from '../../shared/context/ToastContext'

import { Container, ActionsButton, ImagePet } from './styles';

export const Pets = () => {
  const { addToast } = useToast()

  const [pets, setPets] = useState([]);
  const [petId, setPetId] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleSearch = useCallback(() => {
    console.log('PETS - handleSearch');
  }, []);

  const handleDetails = useCallback((id, option) => {
    navigate(`/pets/details/${id}`, { state: { option } })
  }, [navigate]);

  const getAllPets = useCallback(async () => {
    const result = await getPets();

    const formatedResult = result.map(item => {
      return {
        ...item,
        castrated: item.castrated ? 'Castrado' : 'Não Castrado',
      };
    });

    setPets(formatedResult);
    setRefresh(false)
  }, []);

  const handleDeletePet = useCallback(async () => {
    await deletePet(petId)

    setRefresh(true)
    setPetId(null)
    setOpenDeleteModal(false)

    addToast({
      type: 'success',
      title: 'Pet Excluído',
      description: "Pet excluído com sucesso"
    })
  }, [petId, addToast])

  const handleCancelDelete = useCallback(() => {
    setOpenDeleteModal(false)
  }, [])

  const handleOpenModal = useCallback((id) => {
    setPetId(id)
    setOpenDeleteModal(true)
  }, [])

  useEffect(() => {
    getAllPets();
  }, [getAllPets, refresh]);

  return (
    <ContentBaseLayout
      title="Cadastro de pets"
      toolbar={
        <ListToolbar handleSearch={handleSearch} handleNew={handleDetails} />
      }
    >
      <Container>
        {/* children */}
        {openDeleteModal && (
          <DeleteModal
            title="Exclusão de Pet"
            description="O Pet será excluído permanentemente, tem certeza de que deseja continuar ?"
            handleDelete={handleDeletePet}
            handleCancel={handleCancelDelete}
          />
        )}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ações</TableCell>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Raça</TableCell>
                <TableCell align="left">Porte</TableCell>
                <TableCell align="left">Tipo</TableCell>
                <TableCell align="left">Castrado ?</TableCell>
                <TableCell align="left">Idade</TableCell>
                <TableCell align="left">Nome</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pets.map(pet => (
                <TableRow key={pet.id}>
                  <TableCell align="left">
                    <ActionsButton>
                      <button type="button" onClick={() => handleDetails(pet.id, 2)}>
                        <FiEdit />
                      </button>

                      <button type="button" onClick={() => handleDetails(pet.id, 4)}>
                        <FiEye />
                      </button>

                      <button onClick={() => handleOpenModal(pet.id)}>
                        <FiTrash2 />
                      </button>
                    </ActionsButton>
                  </TableCell>
                  <TableCell align="left">
                    <ImagePet
                      src={
                        pet.picture
                          ? environment.API_URL + '/files/' + pet.picture
                          : `https://ui-avatars.com/api/?font-size=0.33&background=BF472C&color=fff&name=${pet?.name}`
                      }
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="left">{pet.race}</TableCell>
                  <TableCell align="left">{pet.port}</TableCell>
                  <TableCell align="left">{pet.type}</TableCell>
                  <TableCell align="left">{pet.castrated}</TableCell>
                  <TableCell align="left">{pet.age}</TableCell>
                  <TableCell align="left">{pet.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ContentBaseLayout>
  );
};
