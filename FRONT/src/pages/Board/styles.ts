import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 60px 15px 40px 15px;
	gap: 20px;

	min-height: 100vh;

	@media all and (max-width: 760px) {
		flex-direction: column;
		align-items: center;
	}
`;
