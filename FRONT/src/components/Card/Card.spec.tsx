import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '.';

const cardMocked = {
	id: 'uuid',
	title: 'Card Mocked',
	content: 'Context plain text',
	list: 'todo',
	currentList: 0,
	listLength: 3,
	onEdit: vi.fn(),
	onDelete: vi.fn(),
	onMove: vi.fn(),
};

describe('<Card />', () => {
	it('should render Card component correctly', () => {
		render(<Card {...cardMocked} />);

		const title = screen.getByText(cardMocked.title);
		const content = screen.getByTestId('markdown-content');
		const buttons = screen.getAllByRole('button');
		const buttonBack = screen.getByLabelText('Voltar');

		expect(title.tagName).toBe('H3');
		expect(content).toBeInTheDocument();
		expect(buttons.length).toEqual(4);
		expect(buttonBack).toHaveAttribute('disabled');
	});

	it('should toggle Card component to edit mode', () => {
		render(<Card {...cardMocked} />);

		const buttonEdit = screen.getByLabelText('Editar');
		expect(buttonEdit).toBeInTheDocument();

		fireEvent.click(buttonEdit);

		expect(buttonEdit).not.toBeInTheDocument();

		const buttonSave = screen.getByLabelText('Salvar');
		const buttonCancel = screen.getByLabelText('Cancelar');
		const input = screen.getByPlaceholderText('Título');
		const textarea = screen.getByPlaceholderText('Conteúdo');

		expect(buttonSave).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(textarea).toBeInTheDocument();
		expect(buttonCancel).toBeInTheDocument();
	});

	it('should Card component call onMove function', () => {
		render(<Card {...cardMocked} />);

		const buttonNext = screen.getByLabelText('Próximo');

		expect(buttonNext).toBeInTheDocument();

		fireEvent.click(buttonNext);

		expect(cardMocked.onMove).toHaveBeenCalledOnce();
	});

	it('should Card component call onEdit function', () => {
		render(<Card {...cardMocked} />);

		const buttonEdit = screen.getByLabelText('Editar');
		fireEvent.click(buttonEdit);
		expect(buttonEdit).not.toBeInTheDocument();

		const form = screen.getByTestId('card-edit-form');

		fireEvent.submit(form);

		expect(cardMocked.onEdit).toHaveBeenCalledOnce();
	});
});
