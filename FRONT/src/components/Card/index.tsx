import { useState, useRef, FormEvent } from 'react';
import { FiEdit, FiArrowLeftCircle, FiArrowRightCircle, FiTrash, FiXCircle, FiSave } from 'react-icons/fi';
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
					<button onClick={() => setMode(ModeType.edit)} aria-label="Editar">
						<FiEdit size={24} />
					</button>
				</header>

				<p>{content}</p>

				<footer>
					<button
						aria-label="Voltar"
						type="button"
						disabled={currentList === 0}
						onClick={() => handleMove(currentList - 1)}
					>
						<FiArrowLeftCircle size={24} />
					</button>

					<button aria-label="Deletar" type="button" onClick={() => onDelete(id)}>
						<FiTrash size={24} />
					</button>

					<button
						aria-label="Próximo"
						type="button"
						disabled={listLength - 1 === currentList}
						onClick={() => handleMove(currentList + 1)}
					>
						<FiArrowRightCircle size={24} />
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
					<button aria-label="Cancelar" type="button" onClick={() => setMode(ModeType.read)}>
						<FiXCircle size={24} />
					</button>

					<button aria-label="Salvar">
						<FiSave size={24} />
					</button>
				</footer>
			</form>
		);
	};

	return <Container>{mode === ModeType.read ? <CardRead /> : <CardEdit />}</Container>;
};
