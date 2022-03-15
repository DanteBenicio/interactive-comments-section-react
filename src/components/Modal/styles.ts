import styled, { css } from 'styled-components';

type ModalContainerProps = {
  showModal: boolean
}

export const ModalContainer = styled('div')<ModalContainerProps>`
  ${({ showModal }) => (showModal ? css`
    display: grid;
    place-items: center;
    position: fixed;
    padding: 1.6rem;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    top: 0;
    left: 0;
    z-index: 999;
  ` : css`
    display: none;
  `)}
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 400px;
  padding: 3.2rem;
  margin: 0 1.6rem;
  background-color: white;
  border-radius: 0.8rem;
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.neutral.darkBlue};
  margin-bottom: 1.6rem;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.neutral.grayishBlue};
  margin-bottom: 2.4rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 320px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

export const CancelButton = styled.button`
  height: 4rem;
  max-width: 16rem;
  width: 100%;
  padding: 0.8rem 3.2rem;

  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;

  color: white;
  background-color: ${({ theme }) => theme.neutral.grayishBlue};
  border: none;
  border-radius: 0.8rem;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary.lightGrayishBlue};
  }
`;

export const DeleteButton = styled.button`
  height: 4rem;
  max-width: 16rem;
  width: 100%;
  padding: 0.8rem 3.2rem;

  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;

  color: white;
  background-color: ${({ theme }) => theme.primary.softRed};
  border: none;
  border-radius: 0.8rem;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary.paleRed};
  }
`;
