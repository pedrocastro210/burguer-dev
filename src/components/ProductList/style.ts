import styled from 'styled-components';

export const StyledProductList = styled.ul`
  @media (max-width: 1150px) {
    > li {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 890px) {
    > li {
      gap: 30px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 550px) {
    > li {
      display: flex;
      overflow: auto;

      padding-bottom: 10px;
      padding-right: 10px;
      margin-right: -10px;
    }

    li > div {
      min-width: 300px;
    }
  }

  @media (max-width: 375px) {
    li > div {
      min-width: 260px;
    }
  }
`;
