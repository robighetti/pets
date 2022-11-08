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

import { ContentBaseLayout } from '../../shared/layouts/ContentBaseLayout';

import { ListToolbar } from '../../shared/components';

import { getPets } from '../../api/petsApi';

import { Container } from './styles';

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
                <TableCell># ID</TableCell>
                <TableCell align="right">Raça</TableCell>
                <TableCell align="right">Porte</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Castrado ?</TableCell>
                <TableCell align="right">Idade</TableCell>
                <TableCell align="right">Nome</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pets.map(pet => (
                <TableRow key={pet.id}>
                  <TableCell>{pet.id}</TableCell>
                  <TableCell align="right">{pet.race}</TableCell>
                  <TableCell align="right">{pet.port}</TableCell>
                  <TableCell align="right">{pet.type}</TableCell>
                  <TableCell align="right">{pet.castrated}</TableCell>
                  <TableCell align="right">{pet.age}</TableCell>
                  <TableCell align="right">{pet.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ContentBaseLayout>
  );
};
