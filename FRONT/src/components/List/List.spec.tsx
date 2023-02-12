import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { List } from '.';

describe('<List />', () => {
	it('should render List component correctly', () => {
		render(
			<List name="List Test" color="#cec">
				<div>Children</div>
			</List>,
		);

		const title = screen.getByText('List Test');
		const children = screen.getByText('Children');

		expect(title).toHaveStyle('background-color: #cec');
		expect(children).toBeInTheDocument();
	});
});
