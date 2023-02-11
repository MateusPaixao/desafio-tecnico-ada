import { useState, useEffect, useRef, FormEvent } from 'react';
import { Card, CardDto, List, FormNewCard } from 'components';
import { CardService } from 'services';

import { Container } from './styles';

const Board = () => {
	const [cards, setCards] = useState<CardDto[]>([]);
	const cardsLoadedRef = useRef(false);

	const lists = [
		{ key: 'todo', name: 'To Do', color: '#2A92BF' },
		{ key: 'doing', name: 'Doing', color: '#F4CE46' },
		{ key: 'done', name: 'Done', color: '#00B961' },
	];

	useEffect(() => {
		if (cardsLoadedRef.current) return;
		CardService.list().then((data) => setCards(data));
		cardsLoadedRef.current = true;
	}, []);

	const handleMove = (targetList: number, cardData: CardDto) => {
		const newList = lists[targetList];
		const cardUpdated = {
			...cardData,
			lista: newList.key,
		};

		CardService.update(cardUpdated, cards).then(setCards);
	};

	const handleCreate = (e: FormEvent<HTMLFormElement>, values: string[]) => {
		const [titulo, conteudo] = values;

		if (!titulo?.trim() || !conteudo?.trim()) return;

		const cardData = { titulo, conteudo, lista: 'todo' };

		CardService.create(cardData).then((data) => setCards([...cards, data]));

		e.currentTarget.reset();
	};

	const handleUpdate = (e: FormEvent<HTMLFormElement>, cardData: CardDto) => {
		const { titulo, conteudo } = cardData;

		if (!titulo?.trim() || !conteudo?.trim()) return;

		CardService.update(cardData, cards).then(setCards);

		e.currentTarget.reset();
	};

	const handleDelete = (cardId: string) => {
		CardService.delete(cardId).then(setCards);
	};

	return (
		<Container>
			<List name="Novo" color="#FB7D44">
				<FormNewCard onSubmit={handleCreate} />
			</List>

			{lists.map(({ key, name, color }, index) => {
				return (
					<List key={key} name={name} color={color}>
						{cards
							.filter(({ lista }) => lista === key)
							.map((card) => {
								return (
									<Card
										key={card.id}
										id={card.id}
										title={card.titulo}
										content={card.conteudo}
										list={card.lista}
										currentList={index}
										listLength={lists.length}
										onMove={handleMove}
										onDelete={handleDelete}
										onEdit={handleUpdate}
									/>
								);
							})}
					</List>
				);
			})}
		</Container>
	);
};

export default Board;
