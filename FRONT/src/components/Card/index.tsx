import { Container } from './styles';

export interface CardDto {
  id: string;
  titulo : string;
  conteudo: string; 
  lista: string | number;
}

interface CardProps {
  id: string;
  title: string;
  content: string;
  currentList: number;
  listLength: number;
  onEdit?: () => void;
  onDelete: (cardId: string) => void;
  onMove: (targetList: number, cardData: CardDto) => void;
}

export const Card = ( { id, title, content, onMove, onDelete, currentList, listLength }: CardProps ) => {
  
  const handleMove = (targetList: number) => {
    onMove(targetList, {
      id,
      titulo: title,
      conteudo: content, 
      lista: targetList,
    })
  }

  return (
    <Container>
      <h3>{title}</h3>
      <p>{content}</p>
      <button type="button" disabled={currentList === 0} onClick={() => handleMove(currentList - 1)}>voltar</button>
      <button type="button" disabled={listLength-1 === currentList} onClick={() => handleMove(currentList + 1)}>próximo</button>

      <button type="button" onClick={() => onDelete(id)}>remover</button>
    </Container>
  )
}