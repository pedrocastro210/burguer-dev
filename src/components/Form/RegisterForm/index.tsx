/* eslint-disable import/no-extraneous-dependencies */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import {
  IRegisterFormValues,
  UserContext,
} from '../../../providers/UserContext';

const RegisterForm = () => {
  const schema = yup
    .object({
      name: yup.string().required('Nome inválido'),
      email: yup.string().required('E-mail inválido').email('E-mail inválido'),
      password: yup
        .string()
        .matches(/.{6,}/, 'Deve conter no mínimo 6 caracteres'),
      confirm: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas não conhecidem')
        .required('Senha obrigatória'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({ resolver: yupResolver(schema) });
  const { userRegister } = useContext(UserContext);

  const submit: SubmitHandler<IRegisterFormValues> = (formData) => {
    userRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Nome'
        register={register('name')}
        error={errors.name}
        type='text'
      />
      <Input
        label='Email'
        register={register('email')}
        error={errors.email}
        type='email'
      />
      <Input
        label='Senha'
        register={register('password')}
        error={errors.password}
        type='password'
      />
      <Input
        label='Comfirmar Senha'
        register={register('confirm')}
        error={errors.confirm}
        type='password'
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
