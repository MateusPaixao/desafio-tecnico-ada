import { useState, useRef, FormEvent } from 'react';
import { FiEdit, FiArrowLeftCircle, FiArrowRightCircle, FiTrash, FiXCircle, FiSave } from 'react-icons/fi';
import { MarkdownContent } from 'components';
import { Container, ReadContainer, EditContainer, Footer } from './styles';

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
			<ReadContainer>
				<header>
					<h3>{title}</h3>
					<button onClick={() => setMode(ModeType.edit)} aria-label="Editar">
						<FiEdit size={20} color="#fff" />
					</button>
				</header>

				<MarkdownContent content={content} />

				<Footer>
					<button
						aria-label="Voltar"
						type="button"
						disabled={currentList === 0}
						onClick={() => handleMove(currentList - 1)}
					>
						<FiArrowLeftCircle size={20} color="#fff" />
					</button>

					<button aria-label="Deletar" type="button" onClick={() => onDelete(id)}>
						<FiTrash size={20} color="#fff" />
					</button>

					<button
						aria-label="Pr??ximo"
						type="button"
						disabled={listLength - 1 === currentList}
						onClick={() => handleMove(currentList + 1)}
					>
						<FiArrowRightCircle size={20} color="#fff" />
					</button>
				</Footer>
			</ReadContainer>
		);
	};

	const CardEdit = () => {
		return (
			<EditContainer data-testid="card-edit-form" onSubmit={handleSubmit}>
				<header>
					<input ref={titleInputRef} type="text" defaultValue={title} name="titulo" placeholder="T??tulo" />
				</header>

				<textarea ref={contentInputRef} name="conteudo" placeholder="Conte??do" defaultValue={content}></textarea>

				<Footer>
					<button aria-label="Cancelar" type="button" onClick={() => setMode(ModeType.read)}>
						<FiXCircle size={20} color="#fff" />
					</button>

					<button aria-label="Salvar">
						<FiSave size={20} color="#fff" />
					</button>
				</Footer>
			</EditContainer>
		);
	};

	return <Container>{mode === ModeType.read ? <CardRead /> : <CardEdit />}</Container>;
};
