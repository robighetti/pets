import { useCallback, useRef, useState } from 'react';

import { FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { Form } from '@unform/web';

import logo from '../../assets/logo.png';

import getValidationErrors from '../../shared/utils/getValidationErrors';

import { Input, Button, Loader } from '../../shared/components';

import { useToast } from '../../shared/context/ToastContext';

import { forgotPassword } from '../../api/petsApi';

import { Container, Content, Background } from './styles';

export const ForgotPassword = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        setIsLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Email é obrigatório!'),
        });

        await schema.validate(data, { abortEarly: false });

        const { email } = data;

        await forgotPassword(email);

        addToast({
          type: 'success',
          title: 'Token Enviado',
          description: 'Por favor verifique seu email',
        });

        setIsLoading(false);

        navigate('/reset-password');
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
    [navigate, addToast]
  );
  return (
    <Container>
      <Content>
        <img src={logo} alt="Pets" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Esqueci minha senha</h1>

          <Input
            name="email"
            icon={FiMail}
            type="email"
            placeholder="Digite seu email"
          />

          {isLoading ? <Loader /> : <Button type="submit">Enviar Token</Button>}

          <Link to="/">Voltar</Link>
        </Form>
      </Content>

      <Background />
    </Container>
  );
};
