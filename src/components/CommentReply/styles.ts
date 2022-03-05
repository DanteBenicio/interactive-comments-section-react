import styled from 'styled-components';

export const FullContainerReply = styled.div`
  padding: 1.6rem 0 1.6rem 6.4rem;
`;

export const Container = styled.article`
  font-size: 1.6rem;

  padding: 1.5rem;
  max-width: 51rem;
  min-height: 16rem;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.neutral.white};
`;

// export const ContainerAddReply = styled.article`
// font-size: 1.6rem;

// padding: 1.5rem;
// max-width: 51rem;
// min-height: auto;
// margin: 1.6rem 0 0;

// border-radius: 0.8rem;

// background-color: ${({ theme }) => theme.neutral.white};
// `;

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
  cursor: pointer;

  &:hover svg > path {
    fill: ${({ theme }) => theme.primary.moderateBlue};
  }
`;

export const Score = styled.span`
  display: grid;
  place-items: center;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.primary.moderateBlue};

  width: 3rem;
  height: 3rem;
`;

export const Minus = styled.span`
  position: relative;
  display: block;

  width: 3rem;
  height: 3rem;

  text-align: center;
  cursor: pointer;

  &:hover svg > path {
    fill: ${({ theme }) => theme.primary.moderateBlue};
  }
`;

export const Image = styled.img`
  width: 3.5rem;
`;

export const Content = styled.div`
  max-width: 43.4rem;
  width: 100%;
  min-height: 11.7rem;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 25rem;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Reply = styled.span`
  display: block;
  position: absolute;

  right: 0;
  top: 0;

  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;

  color: ${({ theme }) => theme.primary.moderateBlue};

  cursor: pointer;

  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.5);
  }

  img {
    margin-right: 0.8rem;
    height: 1.1rem;
  }

`;

export const Username = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.neutral.darkBlue};
`;

export const YouLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  background-color: ${({ theme }) => theme.primary.moderateBlue};
  text-align: center;
  padding: 0.1rem 0.6rem;
`;

export const UserCreatedAt = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.neutral.grayishBlue};
`;

export const UserContent = styled.p`
  width: 100%;

  font-size: 1.5rem;
  color: ${({ theme }) => theme.neutral.grayishBlue};
  word-break: break-all;
`;

export const ActionButtons = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 120px;
  width: 100%;
`;

export const Delete = styled.span`
  display: block;
  height: 17px;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.primary.softRed};

  cursor: pointer;

  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.5);
  }

  img {
    margin-right: 0.8rem;
    height: 1.1rem;
  }
`;

export const Edit = styled.span`
  display: block;
  height: 17px;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary.moderateBlue};

  cursor: pointer;

  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.5);
  }

  img {
    margin-right: 0.8rem;
    height: 1.1rem;
  }
`;

export const TextContent = styled.textarea`
  flex: 1;
  min-height: 2rem;
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1.6rem;
  font-size: 1.4rem;

  border: 1px solid ${({ theme }) => theme.neutral.veryLightGray};
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.neutral.darkBlue};
  outline: none;

  font-size: 1.6rem;

  resize: none;

  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary.moderateBlue};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

export const UpdateButton = styled.button`
  display: block;
  margin-left: auto;
  height: 4rem;
  padding: 0.8rem 1.6rem;

  text-align: center;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 500;

  color: white;
  background-color: ${({ theme }) => theme.primary.moderateBlue};
  border: none;
  border-radius: 0.8rem;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary.lightGrayishBlue};
  }
`;
