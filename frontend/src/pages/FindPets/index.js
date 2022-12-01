import { useCallback, useState, useEffect } from 'react';
import { format } from 'date-fns'
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

import { ContentBaseLayout } from '../../shared/layouts/ContentBaseLayout';
import { ListToolbar } from '../../shared/components';

import { getAllPets } from '../../api/petsApi'
import { environment } from '../../shared/environments';

import { Container, PetImage, ActionsButton } from './styles';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

export const FindPets = () => {
  const [transactions, setTransactions] = useState([])
  const navigate = useNavigate()

  const handleSearch = useCallback(() => {
    console.log('handleSearch');
  }, []);

  const handleDetails = useCallback((id, option) => {
    navigate(`/find-pets/details/${id}`, { state: { option } })
  }, [navigate]);

  const getAllPetsFromDb = useCallback(async () => {
    const result = await getAllPets()

    const transformedResult = result.map(item => {
      return {
        ...item,
        transaction_date: format(new Date(item.transaction_date), 'dd/MM/yyyy')
      }
    })

    setTransactions(transformedResult)
  }, [])

  useEffect(() => {
    getAllPetsFromDb()
  }, [getAllPetsFromDb])

  return (
    <ContentBaseLayout
      title="Adote seu amigo"
      toolbar={
        <ListToolbar handleSearch={handleSearch} handleNew={handleDetails} />
      }
    >
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ações</TableCell>
                <TableCell align="left">Doador</TableCell>
                <TableCell align="left">Adotador</TableCell>
                <TableCell align="left">Nome do pet</TableCell>
                <TableCell align="left">Imagem</TableCell>
                <TableCell align="left">Data da Adoção</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell align="left"><ActionsButton>
                    <button type="button" onClick={() => handleDetails(transaction.transaction_id, 2)}>
                      <FiEdit />
                    </button>

                    <button type="button" onClick={() => handleDetails(transaction.transaction_id, 4)}>
                      <FiEye />
                    </button>

                    <button onClick={() => { console.log('excluir') }}>
                      <FiTrash2 />
                    </button>
                  </ActionsButton></TableCell>
                  <TableCell align="left">{transaction.donate_name}</TableCell>
                  <TableCell align="left">{transaction.adoption_name}</TableCell>
                  <TableCell align="left">{transaction.pet_name}</TableCell>
                  <TableCell align="left">
                    <PetImage src={`${environment.API_URL}/files/${transaction.pet_picture}`} alt="imagem" />
                  </TableCell>
                  <TableCell align="left">{transaction.transaction_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ContentBaseLayout>
  );
};
