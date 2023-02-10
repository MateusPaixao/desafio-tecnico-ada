import { useState, useEffect, useRef, FormEvent } from "react";
import { Card, CardDto, List } from "components";

import { Container } from './styles'

import axios from 'axios'

const Board = () => {
  const [cards, setCards] = useState<CardDto[]>([])

  const titleInputRef = useRef<HTMLInputElement>(null)
  const contentInputRef = useRef<HTMLInputElement>(null)

  const lists = [
    { key: 'todo', name: 'To Do' },
    { key: 'doing', name: 'Doing' },
    { key: 'done', name: 'Done' },
  ]

  useEffect(() => {
    axios
      .get('http://localhost:3333/cards')
      .then(({data}) => setCards(data))
  }, [])

  const handleMove = (targetList: number, cardData: CardDto) => {
    const newList = lists[targetList]
    const cardUpdated = {
      ...cardData,
      lista: newList.key,
    }

    axios
      .put('http://localhost:3333/cards/'+cardData.id, cardUpdated)
      .then(() => {
        const cardsUpdated = cards.map(card => {
          return card.id === cardData.id ? cardUpdated : card
        })
        setCards(cardsUpdated)
      })
  }

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const titulo = titleInputRef.current?.value
    const conteudo = contentInputRef.current?.value

    if(!titulo?.trim() || !conteudo?.trim()) return

    const cardData = {
      titulo,
      conteudo,
      lista: 'todo'
    }

    axios
      .post('http://localhost:3333/cards', cardData)
      .then(({data}) => {
        setCards([...cards, data])
      })

    e.currentTarget.reset()
  }


  const handleDelete = (cardId: string) => {
    axios
      .delete('http://localhost:3333/cards/'+cardId)
      .then(({ data }) => {
        setCards(data)
      })
  }

  return (
    <Container>
      <List name="Novo">
        <form onSubmit={handleCreate}>
          <input ref={titleInputRef} type="text" name="title" placeholder="Título" />
          <input ref={contentInputRef} type="text" name="content" placeholder="Conteúdo" />
          <button>Adicionar</button>
        </form>
      </List>

      {lists.map(({key, name}, index) => {
          return (
            <List key={key} name={name}>
              {
                cards
                .filter(({lista}: any) => lista === key)
                .map((card: any) => {
                  return (
                    <Card 
                      key={card.id} 
                      id={card.id} 
                      title={card.titulo} 
                      content={card.conteudo} 
                      currentList={index} 
                      listLength={lists.length} 
                      onMove={handleMove}
                      onDelete={handleDelete} 
                    />
                  )
                })
              } 
            </List>
          )
        })}
    </Container>
  )
}

export default Board;