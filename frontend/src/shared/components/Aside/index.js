import { useEffect, useCallback, useState } from 'react';

import { MdPets, MdOutlineSearch, MdLogout, MdHome } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import { environment } from '../../environments';

import {
  Container,
  Header,
  ProfileContent,
  ProfileInfo,
  Content,
  Menu,
  MenuItem,
  Logout,
} from './styles';

export const Aside = () => {
  const navigate = useNavigate();

  const [person, setPerson] = useState();

  const getUserDetails = useCallback(async () => {
    const personData = JSON.parse(
      localStorage.getItem(environment.APP_NAME)
    ).person;

    setPerson(personData);
  }, []);

  const { signOut } = useAuth();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <Container>
      <Header>
        <ProfileContent>
          <img
            src={
              person?.avatar
                ? `${environment.API_URL}/files/${person?.avatar}`
                : `https://ui-avatars.com/api/?font-size=0.33&background=fff&color=333&name=${person?.name}`
            }
            alt={person?.name}
          />

          <ProfileInfo>
            <h1>{person?.name || 'Nome'}</h1>

            <span>{person?.email || 'Email'}</span>
          </ProfileInfo>
        </ProfileContent>
      </Header>

      <hr />

      <Content>
        <Menu>
          <MenuItem>
            <button type="button" onClick={() => navigate('/home')}>
              <MdHome />

              <span>Home</span>
            </button>
          </MenuItem>

          <MenuItem>
            <button type="button" onClick={() => navigate('/pets')}>
              <MdPets />

              <span>Cadastre seu pet</span>
            </button>
          </MenuItem>

          <MenuItem>
            <button type="button" onClick={() => navigate('/find-pets')}>
              <MdOutlineSearch />

              <span>Encontre seu pet</span>
            </button>
          </MenuItem>
        </Menu>

        <Logout>
          <button type="button" onClick={signOut}>
            <MdLogout />
            <span>Sair</span>
          </button>
        </Logout>
      </Content>
    </Container>
  );
};
