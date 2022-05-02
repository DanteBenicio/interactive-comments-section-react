import styled, { css } from 'styled-components';

export const WrapperResponding = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
`;

export const UserAvatarIsResponding = styled.img`
  aspect-ratio: attr(width) / attr(height);
`;

export const TextContent = styled.textarea`
  ${({ theme }) => css`
    flex: 1;
    min-height: 2.5rem;
    height: 7.0rem;
    padding: 0.8rem 1rem;
    font-size: 1.4rem;

    border: 1px solid ${theme.neutral.veryLightGray};
    border-radius: 0.4rem;
    color: ${theme.neutral.darkBlue};
    outline: none;

    background-color: ${theme.neutral.veryLightGray};

    font-size: 1.6rem;

    resize: none;

    transition: border-color 0.2s ease;

    &:focus {
      border-color: ${theme.primary.moderateBlue};
    }
    &:focus::placeholder {
      color: transparent;
    }
  `}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    height: 4rem;
    padding: 0.8rem 1.6rem;

    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;

    color: white;
    background-color: ${theme.primary.moderateBlue};
    border: none;
    border-radius: 0.8rem;

    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${theme.primary.lightGrayishBlue};
    }
  `}
`;
