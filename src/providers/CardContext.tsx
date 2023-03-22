/* eslint-disable no-console */
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { api } from '../services';

export interface IDefaultProviderProps {
  children: React.ReactNode;
}

interface ICardContext {
  loadProductsList: () => void;
  productsList: IProduct[] | null;
  addProductModal: (id: number) => void;
  productModal: IProduct[];
  setProductModal: React.Dispatch<React.SetStateAction<IProduct[]>>;
  deleteProductModal: (id: number) => void;
  searchProducts: IProduct[];
  SetFilteredProducts: React.Dispatch<React.SetStateAction<string>>;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface ICardModal {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface ITotalValue {
  price: number;
}

export const CardContext = createContext({} as ICardContext);

export const CardProvider = ({ children }: IDefaultProviderProps) => {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [productModal, setProductModal] = useState<IProduct[]>([]);
  const [filteredProducts, SetFilteredProducts] = useState<string>('');

  const navigate = useNavigate();

  const loadProductsList = async () => {
    const token = localStorage.getItem('@TOKEN');

    if (!token) {
      navigate('/');
    }

    try {
      const response = await api.get<IProduct[]>('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductsList(response.data);
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data === 'jwt expired' ||
        error.response.data === 'jwt malformed'
      ) {
        localStorage.removeItem('@TOKEN');
        navigate('/');
      }
    }
  };

  const addProductModal = (id: number) => {
    const getProduct = productsList.find((product) => product.id === id);

    if (getProduct) {
      const verificationProduct = productModal.some(
        (product) => product.id === id
      );

      if (verificationProduct) {
        toast.warning('Produto já cadastrado');
      } else {
        setProductModal([...productModal, getProduct]);
        toast.success('Produto adicionado ao carrinho');
      }
    }
  };

  const deleteProductModal = (id: number) => {
    const newProducts = productModal.filter((product) => product.id !== id);
    setProductModal(newProducts);
  };

  const searchProducts = productsList.filter((product) =>
    filteredProducts === ''
      ? true
      : product.category.toLowerCase().includes(filteredProducts.toLowerCase())
  );

  return (
    <CardContext.Provider
      value={{
        loadProductsList,
        productsList,
        addProductModal,
        productModal,
        setProductModal,
        deleteProductModal,
        searchProducts,
        SetFilteredProducts,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
