import styled from 'styled-components';

export const Container = styled.div`
	min-height: 80px;
	max-height: 300px;
	overflow-y: auto;

	table,
	tr,
	td {
		border: 1px solid #555;
		padding: 5px;
	}

	ul,
	ol {
		list-style: circle;
		padding: 10px 30px;
	}

	ol {
		list-style-type: upper-roman;
	}
`;
