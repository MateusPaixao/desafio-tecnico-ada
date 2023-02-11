import { useState, useRef, FormEvent } from 'react';
import { Container } from './styles';

export interface CardDto {
	id: string;
	titulo: string;
	conteudo: string;
	lista: string | number;
}

interface CardProps {
	id: string;
	title: string;
	content: string;
	list: string | number;
	currentList: number;
	listLength: number;
	onEdit: (e: FormEvent<HTMLFormElement>, cardData: CardDto) => void;
	onDelete: (cardId: string) => void;
	onMove: (targetList: number, cardData: CardDto) => void;
}

enum ModeType {
	read,
	edit,
}

export const Card = ({ id, title, content, list, onMove, onDelete, onEdit, currentList, listLength }: CardProps) => {
	const [mode, setMode] = useState<ModeType>(ModeType.read);
	const titleInputRef = useRef<HTMLInputElement>(null);
	const contentInputRef = useRef<HTMLTextAreaElement>(null);

	const handleMove = (targetList: number) => {
		onMove(targetList, {
			id,
			titulo: title,
			conteudo: content,
			lista: targetList,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const titulo = titleInputRef.current?.value || '';
		const conteudo = contentInputRef.current?.value || '';

		const cardData = {
			id,
			titulo,
			conteudo,
			lista: list,
		};

		onEdit(e, cardData);
		setMode(ModeType.read);
	};

	const CardRead = () => {
		return (
			<div>
				<header>
					<h3>{title}</h3>
					<button onClick={() => setMode(ModeType.edit)}>Editar</button>
				</header>

				<p>{content}</p>

				<footer>
					<button type="button" disabled={currentList === 0} onClick={() => handleMove(currentList - 1)}>
						voltar
					</button>
					<button type="button" disabled={listLength - 1 === currentList} onClick={() => handleMove(currentList + 1)}>
						próximo
					</button>

					<button type="button" onClick={() => onDelete(id)}>
						remover
					</button>
				</footer>
			</div>
		);
	};

	const CardEdit = () => {
		return (
			<form onSubmit={handleSubmit}>
				<header>
					<input ref={titleInputRef} type="text" defaultValue={title} name="titulo" placeholder="Título" />
				</header>

				<textarea ref={contentInputRef} name="conteudo" placeholder="Conteúdo" defaultValue={content}></textarea>

				<footer>
					<button type="button" onClick={() => setMode(ModeType.read)}>
						cancelar
					</button>

					<button>salvar</button>
				</footer>
			</form>
		);
	};

	return <Container>{mode === ModeType.read ? <CardRead /> : <CardEdit />}</Container>;
};
