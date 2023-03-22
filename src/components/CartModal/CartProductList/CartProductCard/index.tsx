/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CardContext } from '../../../../providers/CardContext';

const CartProductCard = () => {
  const { productModal, deleteProductModal } = useContext(CardContext);

  return (
    <>
      {productModal.map((product) => (
        <StyledCartProductCard key={product.id}>
          <div className='imageBox'>
            <img src={product.img} alt={product.name} />
          </div>
          <div className='contentBox'>
            <StyledTitle tag='h3' $fontSize='three'>
              {product.name}
            </StyledTitle>
            <button
              type='button'
              aria-label='Remover'
              onClick={() => {
                deleteProductModal(product.id);
              }}
            >
              <MdDelete size={24} />
            </button>
          </div>
        </StyledCartProductCard>
      ))}
    </>
  );
};

export default CartProductCard;
