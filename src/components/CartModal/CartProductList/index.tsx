import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CardContext } from '../../../providers/CardContext';

const CartProductList = () => {
  const { productModal, setProductModal } = useContext(CardContext);

  const totalPrice = productModal.reduce(
    (accumulator, interator) => accumulator + interator.price,
    0
  );

  return (
    <StyledCartProductList>
      <ul>
        <CartProductCard />
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          R$ {totalPrice?.toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        onClick={() => {
          setProductModal([]);
        }}
        $buttonSize='default'
        $buttonStyle='gray'
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
