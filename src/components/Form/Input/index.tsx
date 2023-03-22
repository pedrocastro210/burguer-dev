/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unused-prop-types */
import { FieldError, UseFormRegisterReturn } from 'react-hook-form/dist/types';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInput {
  label: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
  type: 'text' | 'password' | 'email' | 'confirmPassword';
}

const Input = ({ label, register, error, type }: IInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} {...register} />
    <StyledParagraph fontColor='red'>{error?.message}</StyledParagraph>
  </fieldset>
);

export default Input;
