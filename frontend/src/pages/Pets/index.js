import { useCallback, useEffect, useState } from 'react';

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

import { ListToolbar } from '../../shared/components';

import { getPets } from '../../api/petsApi';
import { environment } from '../../shared/environments';

import { Container, ActionsButton, ImagePet } from './styles';

export const Pets = () => {
  const [pets, setPets] = useState([]);

  const handleSearch = useCallback(() => {
    console.log('PETS - handleSearch');
  }, []);

  const handleNew = useCallback(() => {
    console.log('PETS - handleNew');
  }, []);

  const getAllPets = useCallback(async () => {
    const result = await getPets();

    const formatedResult = result.map(item => {
      return {
        ...item,
        castrated: item.castrated ? 'Castrado' : 'Não Castrado',
      };
    });

    setPets(formatedResult);
  }, []);

  useEffect(() => {
    getAllPets();
  }, [getAllPets]);

  return (
    <ContentBaseLayout
      title="Cadastro de pets"
      toolbar={
        <ListToolbar handleSearch={handleSearch} handleNew={handleNew} />
      }
    >
      <Container>
        {/* children */}
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
                      <button>
                        <FiEdit />
                      </button>

                      <button>
                        <FiEye />
                      </button>

                      <button>
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
