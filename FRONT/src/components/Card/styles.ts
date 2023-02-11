import styled from 'styled-components';

export const Container = styled.div`
	padding: 15px;
	background-color: #191a1d;

	button {
		background-color: transparent;
		border: none;
	}
`;

export const ReadContainer = styled.div`
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: 1px solid #333;
	}
`;

export const EditContainer = styled.form`
	input,
	textarea {
		width: 100%;
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
`;

export const Content = styled.div`
	min-height: 80px;
`;

export const Footer = styled.footer`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid #333;
	padding-top: 10px;

	button:disabled {
		opacity: 0.2;
	}
`;
