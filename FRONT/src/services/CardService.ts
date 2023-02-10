import api from './config/CardApi';

export interface CardDto {
    id: string;
    titulo : string;
    conteudo: string; 
    lista: string | number;
}

export const CardService = {
    list: async (): Promise<CardDto[]> => {
        const { data } = await api.get('/cards')
        return data
    },

    create: async (cardData: Partial<CardDto>): Promise<CardDto> => {
        const { data } = await api.post('/cards', cardData)
        return data
    },

    update: async (cardData: Partial<CardDto>, currentCards: CardDto[]): Promise<CardDto[]> => {
        const { data } = await api.put(`/cards/${cardData.id}`, cardData)

        const cardsUpdated = currentCards.map(card => {
          return card.id === cardData.id ? data : card
        })

        return cardsUpdated
    },

    delete: async (cardId: string): Promise<CardDto[]> => {
        const { data } = await api.delete(`/cards/${cardId}`)
        return data
    }
}