import styled from 'styled-components';
interface ContainerProps {
	color: string;
}

export const Container = styled.div<ContainerProps>`
	background-color: #292b31;
	width: 100%;
	max-width: 250px;

	h2 {
		background-color: ${({ color }) => color};
		padding: 5px 10px;
		font-weight: bold;
		color: #292b31;
		margin-bottom: 10px;
	}

	@media all and (max-width: 760px) {
		max-width: 100%;
	}
`;

export const Content = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
