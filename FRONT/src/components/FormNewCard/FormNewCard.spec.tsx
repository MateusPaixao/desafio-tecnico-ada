import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormNewCard } from '.';

const onSubmitMocked = vi.fn();

describe('<FormNewCard />', () => {
	it('should render FormNewCard component correctly', async () => {
		render(<FormNewCard onSubmit={onSubmitMocked} />);

		const input = screen.getByPlaceholderText('Título');
		const textarea = screen.getByPlaceholderText('Conteúdo');
		const buttonAdd = screen.getByLabelText('Adicionar');

		expect(input).toBeInTheDocument();
		expect(textarea).toBeInTheDocument();
		expect(buttonAdd).toBeInTheDocument();

		const form = screen.getByTestId('form-new-card');

		fireEvent.submit(form);

		expect(onSubmitMocked).toHaveBeenCalledOnce();
	});
});
