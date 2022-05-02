import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { NavbarProps } from '../../types/navbar';
import Switch from '../Switch';
import {
  Container, Logo, LogoWrapper, Wrapper,
} from './styles';

export default function Navbar({ toggleTheme }: NavbarProps) {
  const { title } = useContext(ThemeContext);

  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Logo src="assets/favicon.png" alt="two comment ballons" />
        </LogoWrapper>
        <Switch
          toggleTheme={toggleTheme}
          checked={title === 'dark'}
        />
      </Wrapper>
    </Container>
  );
}
