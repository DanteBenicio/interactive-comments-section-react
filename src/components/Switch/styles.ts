import styled, { css } from 'styled-components';

type ButtonProps = {
  checked: boolean
}

export const Button = styled('button')<ButtonProps>`
  ${({ checked }) => css`
    transition: all 0.3s;
    width: 6rem;
    height: 2.80rem;
    border-radius: 2rem;
    border: none;
    padding: 0.3rem 0.3rem;
    background-color: ${checked ? '#5457b6' : '#e2e1e1'};
    cursor: pointer;


    > span {
      display: block;
      border-radius: 50%;
      width: 2.2rem;
      height: 100%;
      background-color: white;
      transition: transform 0.3s;
      transform: translateX(${checked ? 145 : 0}%);
    }
  `}
`;
