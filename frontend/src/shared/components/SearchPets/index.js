import { useRef, useCallback, useState, useEffect } from 'react';

import { useTheme } from 'styled-components'
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import { Form } from '@unform/web';

import Scrollbar from 'react-perfect-scrollbar';

import { Button } from '../form/button/Button';
import { Select } from '../form/select/Select'
import { Container, Content, Header, Description, ActionContainer, ListPets, ActionsButton, ImagePet, Filter } from "./styles"

import { FiSearch } from 'react-icons/fi';
import { Input } from '../form/input/Input';

import { getPets } from '../../../api/petsApi'
import { environment } from '../../environments';

export const SearchPets = ({ handleCancel }) => {
  const theme = useTheme();
  const formRef = useRef(null);

  const [pets, setPets] = useState([])

  const selectOptions = [
    {
      value: 'xx',
      label: 'Limpar filtro'
    },
    {
      value: 'race',
      label: 'Raça'
    },
    {
      value: 'port',
      label: 'Porte'
    },
    {
      value: 'age',
      label: 'Idade'
    }
  ]

  const handleGetPets = useCallback(async () => {
    const result = await getPets();

    console.log(result)

    setPets(result)
  }, [])

  const handleSearch = useCallback(async (data) => {
    const { type, description } = data;

    let newList = []

    switch (type) {
      case 'race': {
        newList = pets.filter(pet => pet.race.toLowerCase() === description.toLowerCase())
        setPets(newList)
        break;
      }

      case 'port': {
        newList = pets.filter(pet => pet.port.toLowerCase() === description.toLowerCase())
        setPets(newList)
        break;
      }

      case 'age': {
        newList = pets.filter(pet => pet.age.toLowerCase() === description.toLowerCase())
        setPets(newList)
        break;
      }

      case 'xx': {
        await handleGetPets();
        break
      }

      default:
    }
  }, [pets, handleGetPets])



  useEffect(() => {
    handleGetPets()
  }, [handleGetPets])

  return (
    <Container>
      <Content>
        <Header>
          <h1>Busca de pets</h1>
        </Header>

        <Description>
          <span>
            Selecione o pet para adoção
          </span>
        </Description>

        <Filter>
          <Form ref={formRef} onSubmit={handleSearch}>
            <Select name="type" placeholder="Qual sua pesquisa" options={selectOptions} />
            <Input
              name="description"
              icon={FiSearch}
              type="text"
              placeholder="Digite o nome do seu pet"
            />
            <Button type="submit">
              <FiSearch />
            </Button>
          </Form>
        </Filter>
        <ListPets>

          <TableContainer component={Paper}>
            <Scrollbar style={{
              height: '360px',
              width: '100%',
              flex: 1,
            }}>
              <Table sx={{ minWidth: '100%' }} aria-label="simple table">

                <TableHead>
                  <TableRow>
                    <TableCell align="left">Ações</TableCell>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Raça</TableCell>
                    <TableCell align="left">Castrado ?</TableCell>
                    <TableCell align="left">Nome</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pets.map(pet => (
                    <TableRow key={Math.random()}>
                      <TableCell align="left">
                        <ActionsButton>
                          <button type="button" onClick={() => console.log('ok')}>
                            <BsFillCheckCircleFill />
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
                      <TableCell align="left">{pet.castrated ? 'Castrado' : 'Não Castrado'}</TableCell>
                      <TableCell align="left">{pet.name}</TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </ListPets>

        <ActionContainer>
          <Button
            onClick={handleCancel}
            style={{
              background: theme.background,
              border: `1px solid ${theme.primary}`,
              color: theme.text
            }}
          >Cancelar</Button>
        </ActionContainer>
      </Content>
    </Container >
  )
}