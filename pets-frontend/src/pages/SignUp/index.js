import { useCallback, useRef } from 'react';

import { FiMail, FiLock, FiArrowLeft, FiEdit } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import logo from '../../assets/logo.png';

import getValidationErrors from '../../shared/utils/getValidationErrors';

import { Input, Button } from '../../shared/components';

import { api } from '../../shared/services';

import { Container, Content, Background } from './styles';

export const SignUp = () => {
  const formRef = useRef(null);

  const handleSubmit = useCallback(async data => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório!'),
        email: Yup.string().email().required('Email é obrigatório!'),
        whatsapp: Yup.string()
          .min(13, 'Precisa ser no minimo 13 caracteres')
          .required('Whatsapp é obrigatório!'),
        password: Yup.string().min(6, 'Minimo de 6 caracteres!'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current.setErrors(errors);
    }

    //const response = await api.post('/persons', data);
    //console.log(response);
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Pets" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
