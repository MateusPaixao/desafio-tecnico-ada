import { ReactNode } from 'react';

import { Container, Content } from './styles';

interface ListProps {
	name: string;
	color: string;
	children: ReactNode;
}

export const List = ({ name, color, children }: ListProps) => {
	return (
		<Container color={color}>
			<h2>{name}</h2>
			<Content>{children}</Content>
		</Container>
	);
};
