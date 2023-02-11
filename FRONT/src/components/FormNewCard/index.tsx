import { useRef, FormEvent } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import { Container } from './styles';

interface FormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>, values: string[]) => void;
}

export const FormNewCard = ({ onSubmit }: FormProps) => {
	const titleInputRef = useRef<HTMLInputElement>(null);
	const contentInputRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const titulo = titleInputRef.current?.value || '';
		const conteudo = contentInputRef.current?.value || '';

		onSubmit(e, [titulo, conteudo]);
	};

	return (
		<Container onSubmit={handleSubmit}>
			<input ref={titleInputRef} type="text" name="title" placeholder="Título" />
			<textarea ref={contentInputRef} name="content" placeholder="Conteúdo"></textarea>
			<button aria-label="Adicionar">
				<FiPlusCircle size={20} color="#fff" />
			</button>
		</Container>
	);
};
