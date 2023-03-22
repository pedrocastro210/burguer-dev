/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ILoginFormValues, UserContext } from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const schema = yup
    .object({
      email: yup.string().required('E-mail inválido').email('E-mail inválido'),
      password: yup
        .string()
        .matches(/.{6,}/, 'Deve conter no mínimo 6 caracteres'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({ resolver: yupResolver(schema) });

  const { userLogin } = useContext(UserContext);

  const submit: SubmitHandler<ILoginFormValues> = (formData) => {
    userLogin(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Nome'
        register={register('email')}
        error={errors.email}
        type='text'
      />
      <Input
        label='Senha'
        register={register('password')}
        error={errors.password}
        type='password'
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
