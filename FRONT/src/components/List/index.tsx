import { ReactNode } from 'react';

import { Container } from './styles';

interface ListProps {
    name: string;
    children: ReactNode;
}

export const List = ( { name, children }: ListProps ) => {
  return (
    <Container>
        <h1>{name}</h1>
        <div>
            {children} 
        </div>
    </Container>
  )
}