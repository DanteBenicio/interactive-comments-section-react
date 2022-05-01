import Switch from 'react-switch';
import {
  Container, Logo, LogoWrapper, Wrapper,
} from './styles';

export default function Navbar() {
  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Logo src="assets/favicon.png" alt="two comment ballons" />
        </LogoWrapper>
        <Switch />
      </Wrapper>
    </Container>
  );
}
