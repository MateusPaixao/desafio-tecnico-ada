import styled from 'styled-components';
interface ContainerProps {
	color: string;
}

export const Container = styled.div<ContainerProps>`
	box-shadow: 0px 0px 50px -30px rgba(0, 0, 0.6);
	background-color: #292b31;
	width: 100%;
	max-width: 280px;

	&:hover {
		transition: all 0.2s ease-in-out;
		transform: scale(1.01);
	}

	> h2 {
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
