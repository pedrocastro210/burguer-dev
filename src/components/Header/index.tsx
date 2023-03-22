import { MdShoppingCart, MdLogout } from 'react-icons/md';
import { useContext } from 'react';
import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import BurguerDev from '../../assets/BurguerDev.svg';
import { StyledContainer } from '../../styles/grid';
import { UserContext } from '../../providers/UserContext';
import { CardContext } from '../../providers/CardContext';

interface IModal {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setModal }: IModal) => {
  const { userLogout } = useContext(UserContext);
  const { productModal } = useContext(CardContext);

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img src={BurguerDev} alt='Burguer Dev Logo' className='logo' />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  setModal(true);
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <span className='contador'>{productModal.length}</span>
              <button onClick={() => userLogout()} type='button'>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
