import { useRef, FormEvent } from 'react';
import { Container } from './styles';

interface FormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>, values: string[]) => void;
}

export const FormNewCard = ({ onSubmit }: FormProps) => {
	const titleInputRef = useRef<HTMLInputElement>(null);
	const contentInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const titulo = titleInputRef.current?.value || '';
		const conteudo = contentInputRef.current?.value || '';

		onSubmit(e, [titulo, conteudo]);
	};

	return (
		<Container onSubmit={handleSubmit}>
			<input ref={titleInputRef} type="text" name="title" placeholder="Título" />
			<input ref={contentInputRef} type="text" name="content" placeholder="Conteúdo" />
			<button>Adicionar</button>
		</Container>
	);
};
