/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services';

export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  name: string;
  confirm: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

interface IUserContext {
  user: IUser | null;
  userRegister: (formData: IRegisterFormValues) => Promise<void>;
  userLogin: (formData: ILoginFormValues) => Promise<void>;
  userLogout: () => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const userLoad = async () => {
    const token = localStorage.getItem('@TOKEN');

    if (token) {
      navigate('/shop');
    }
  };

  useEffect(() => {
    userLoad();
  }, []);

  const userRegister = async (formData: IRegisterFormValues) => {
    try {
      const response = await api.post('/users', formData);
      toast.success('Cadastro realizado com sucesso');
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.acessToken);
      navigate('/');
    } catch (error: any) {
      console.log(error);
      if (error.response.data === 'Email already exists') {
        toast.error('Esse email já existe');
      }
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    try {
      const response = await api.post('/login', formData);
      toast.success('Login realizado com sucesso');
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      navigate('/shop');
    } catch (error) {
      console.log(error);
      toast.error('Login inválido, tente novamente');
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, userRegister, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
