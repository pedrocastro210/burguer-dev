import { useContext, useEffect } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CardContext } from '../../../providers/CardContext';

const ProductCard = () => {
  const { loadProductsList, addProductModal, searchProducts } =
    useContext(CardContext);

  useEffect(() => {
    loadProductsList();
  }, []);

  return (
    <StyledProductCard>
      {searchProducts.length > 0 ? (
        searchProducts.map((item) => (
          <div key={item.id}>
            <div className='imageBox'>
              <img src={item.img} alt={item.name} />
            </div>
            <div className='content'>
              <StyledTitle tag='h3' $fontSize='three'>
                {item.name}
              </StyledTitle>
              <StyledParagraph className='category'>
                {item.category}
              </StyledParagraph>
              <StyledParagraph className='price'>
                {item.price.toFixed(2)}
              </StyledParagraph>
              <StyledButton
                $buttonSize='medium'
                $buttonStyle='green'
                onClick={() => {
                  addProductModal(item.id);
                }}
              >
                Adicionar
              </StyledButton>
            </div>
          </div>
        ))
      ) : (
        <h3>Produto não encontrado</h3>
      )}
    </StyledProductCard>
  );
};

export default ProductCard;
