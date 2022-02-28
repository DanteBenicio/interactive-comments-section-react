import styled from 'styled-components';

export const Container = styled.article`
  font-size: 1.6rem;

  padding: 1rem;
  max-width: 50rem;
  height: 15rem;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.neutral.white};
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1.6rem;
`;

export const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.neutral.veryLightGray};
`;

export const Plus = styled.span`
  position: relative;
  display: block;

  width: 3rem;
  height: 3rem;

  text-align: center;
`;

export const Score = styled.span`
  display: grid;
  place-items: center;
  text-align: center;

  width: 3rem;
  height: 3rem;
`;

export const Minus = styled.span`
  position: relative;
  display: block;

  width: 3rem;
  height: 3rem;

  text-align: center;
`;

export const Image = styled.img`
  width: 4rem;
`;

export const ImageIcon = styled.img`
  position: absolute;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  object-fit: contain;

  width: 1.5rem;
`;

export const Content = styled.div``;

export const UserInfo = styled.div``;

export const Username = styled.span``;

export const UserCreatedAt = styled.span``;

export const UserContent = styled.p`
  font-size: 1.4rem;
`;
