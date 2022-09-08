import { useCallback } from 'react';

import { FiMail, FiLock, FiArrowLeft, FiEdit } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';

import logo from '../../assets/logo.png';

import { Input, Button } from '../../shared/components';

import { api } from '../../shared/services';

import { Container, Content, Background } from './styles';

export const SignUp = () => {
  const handleSubmit = useCallback(async data => {
    const response = await api.post('/persons', data);

    console.log(response);
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Pets" />

        <Form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>

          <Input
            name="name"
            icon={FiEdit}
            type="text"
            placeholder="Digite seu nome"
          />

          <Input
            name="email"
            icon={FiMail}
            type="email"
            placeholder="Digite seu email"
          />

          <Input
            name="whatsapp"
            icon={FaWhatsapp}
            type="text"
            placeholder="Digite seu whatsapp"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft size={20} />
          Já tenho uma conta, fazer logon
        </Link>
      </Content>
    </Container>
  );
};
