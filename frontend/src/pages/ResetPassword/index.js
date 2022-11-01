import { useCallback, useRef, useState } from 'react';

import { FiClock, FiHash, FiLock, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { Form } from '@unform/web';

import logo from '../../assets/logo.png';

import getValidationErrors from '../../shared/utils/getValidationErrors';

import { Input, Button, Loader } from '../../shared/components';

import { useToast } from '../../shared/context/ToastContext';

import { resetPassword } from '../../api/petsApi';

import { Container, Content, Background } from './styles';

export const ResetPassword = () => {
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
          password: Yup.string().required('Senha é obrigatório!'),
          confirmPassword: Yup.string().required(
            'Confirmação de senha é obrigatório!'
          ),
          token: Yup.string().min(6).required('Token é obrigatório!'),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, confirmPassword, token } = data;

        if (password !== confirmPassword) {
          addToast({
            type: 'error',
            title: 'Senhas não conferem',
            description: 'Por favor verifique suas senhas',
          });

          return;
        }

        await resetPassword({ token, password });

        addToast({
          type: 'success',
          title: 'Senha Alterada',
          description: 'Senha Alterada com Sucesso',
        });

        setIsLoading(false);

        navigate('/');
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
          <h1>Resetar minha senha</h1>

          <Input
            name="token"
            icon={FiHash}
            type="text"
            placeholder="Digite seu token"
          />

          <br />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Digite sua nova senha"
          />

          <Input
            name="confirmPassword"
            icon={FiLock}
            type="password"
            placeholder="Confirme sua nova senha"
          />

          {isLoading ? (
            <Loader />
          ) : (
            <Button type="submit">Resetar Senha</Button>
          )}

          <Link to="/forgot-password">Voltar</Link>
        </Form>
      </Content>

      <Background />
    </Container>
  );
};
