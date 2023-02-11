import styled from 'styled-components';

export const Container = styled.form`
	display: flex;
	gap: 5px;
	flex-direction: column;
	background-color: #191a1d;
	padding: 15px;

	input,
	textarea {
		background-color: transparent;
		color: #fff;
		border: none;
		border-bottom: 1px solid #333;
		margin-bottom: 10px;
		padding: 5px;
		outline: none;
		font-size: 16px;

		&::placeholder {
			color: #cecece;
		}
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	button {
		background-color: transparent;
		border: none;
	}
`;
