import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarkdownContent } from '.';

describe('<MarkdownContent />', () => {
	it('should render MarkdownContent component correctly', () => {
		const contentMock = '# Heading text!';
		render(<MarkdownContent content={contentMock} />);

		const paragraph = screen.getByText('Heading text!');

		expect(paragraph.tagName).toBe('H1');
	});

	it('should render MarkdownContent component with code highlight', () => {
		const contentMock = `~~~javascript\nconst variableTest = 'contentVar';\n~~~`;
		render(<MarkdownContent content={contentMock} />);

		const code = screen.getByTestId('code-highlight');

		expect(code.tagName).toBe('CODE');
		expect(code.className).toEqual('hljs javascript');
	});

	it('should render MarkdownContent component with image', () => {
		const contentMock = `![Kitten Placeholder](https://placekitten.com/g/400/400)`;
		render(<MarkdownContent content={contentMock} />);

		const image = screen.getByAltText('Kitten Placeholder');

		expect(image.tagName).toBe('IMG');
	});
});
