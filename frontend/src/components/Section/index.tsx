import React, { ReactNode } from 'react';

import { Container, Wrapper } from './styles';

type SectionProps = {
  children: ReactNode
}

export default function Section({ children }: SectionProps) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}
