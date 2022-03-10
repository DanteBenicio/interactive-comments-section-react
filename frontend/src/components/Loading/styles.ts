import styled, { keyframes } from 'styled-components';

const rotateSpinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Load = styled.div`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;

  &::after {
    content: " ";
    position: absolute;
    left: -5%;
    top: -5%;
    transform: translate(-50%, -50%);
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: ${({ theme }) => theme.primary.moderateBlue} transparent ${({ theme }) => theme.primary.moderateBlue} transparent;
    animation: ${rotateSpinner} 1.2s linear infinite;
  }
`;
