import styled from 'styled-components';

export const Container = styled.header`
  max-width: 100vw;
  padding: 1rem 2.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.neutral.white};
`;

export const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LogoWrapper = styled.div`
  width: 50px;
`;

export const Logo = styled.img`
  object-fit: contain;
`;
