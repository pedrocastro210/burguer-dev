import { MdSearch } from 'react-icons/md';
import { useContext, useState } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CardContext } from '../../../providers/CardContext';

const SearchForm = () => {
  const { SetFilteredProducts } = useContext(CardContext);
  const [searchValue, setSearchValue] = useState('');

  const submit = (event: any) => {
    event.preventDefault();
    SetFilteredProducts(searchValue);
  };

  return (
    <StyledSearchForm onSubmit={submit}>
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        type='text'
        placeholder='Digitar pesquisa'
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
