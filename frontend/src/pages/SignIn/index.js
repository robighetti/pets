import { useCallback, useRef } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { Form } from '@unform/web';

import logo from '../../assets/logo.png';

import getValidationErrors from '../../shared/utils/getValidationErrors';

import { Input, Button } from '../../shared/components';

import { useAuth } from '../../shared/context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';

import { Container, Content, Background } from './styles';

export const SignIn = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Email é obrigatório!'),
          password: Yup.string().required('Senha é obrigatória!'),
        });

        await schema.validate(data, { abortEarly: false });

        const { email, password } = data;

        await signIn({ email, password });

        navigate('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current.setErrors(error);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no login',
          description: 'Erro ao logar, verificar suas credenciais',
        });
      }
    },
    [signIn, navigate, addToast]
  );
  return (
    <Container>
      <Content>
        <img src={logo} alt="Pets" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input
            name="email"
            icon={FiMail}
            type="email"
            placeholder="Digite seu email"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>

          <Link to="/forgot-password">Esqueci minha senha</Link>
        </Form>

        <Link to="/sign-up">
          <FiLogIn />
          Crie sua conta
        </Link>
      </Content>

      <Background />
    </Container>
  );
};
