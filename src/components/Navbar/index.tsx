import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { NavbarProps } from '../../types/navbar';
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
          onChange={toggleTheme}
          checked={title !== 'light'}
          checkedIcon={false}
          uncheckedIcon={false}
          handleDiameter={20}
          offColor="#e2e1e1"
          onColor="#5457b6"
        />
      </Wrapper>
    </Container>
  );
}
