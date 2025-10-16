import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Deck, Card } from '../types';

// Interface com todas as operações disponíveis para gerenciar decks
interface DeckContextData {
    decks: Deck[];
    setDecks: (decks: Deck[]) => void;
    addDeck: (deck: Deck) => void;
    updateDeck: (deckId: number, updatedDeck: Deck) => void;
    removeDeck: (deckId: number) => void;
    addCardToDeck: (deckId: number, card: Card) => void;
    updateCardInDeck: (deckId: number, cardId: number, updatedCard: Card) => void;
    removeCardFromDeck: (deckId: number, cardId: number) => void;
    refreshDecks: () => Promise<void>;
}

// Cria contexto para compartilhar estado dos decks entre componentes
const DeckContext = createContext<DeckContextData>({} as DeckContextData);

// Hook para acessar facilmente as funções de gerenciamento de decks
export const useDeck = () => useContext(DeckContext);

interface DeckProviderProps {
    children: ReactNode;
}

// Provedor que gerencia o estado global dos decks e cards
// Centraliza toda a lógica de manipulação de dados de estudo
export const DeckProvider: React.FC<DeckProviderProps> = ({ children }) => {
    const [decks, setDecks] = useState<Deck[]>([]);

    // Adiciona novo deck à lista (inserção no início)
    const addDeck = (deck: Deck) => {
        setDecks(prev => [deck, ...prev]);
    };

    // Atualiza informações de um deck existente
    const updateDeck = (deckId: number, updatedDeck: Deck) => {
        setDecks(prev => prev.map(deck =>
            deck.id === deckId ? updatedDeck : deck
        ));
    };

    // Remove deck específico da lista
    const removeDeck = (deckId: number) => {
        setDecks(prev => prev.filter(deck => deck.id !== deckId));
    };

    // Adiciona novo card a um deck específico
    const addCardToDeck = (deckId: number, card: Card) => {
        setDecks(prev => prev.map(deck =>
            deck.id === deckId
                ? { ...deck, cards: [...deck.cards, card] }
                : deck
        ));
    };

    // Atualiza informações de um card dentro de um deck
    const updateCardInDeck = (deckId: number, cardId: number, updatedCard: Card) => {
        setDecks(prev => prev.map(deck =>
            deck.id === deckId
                ? {
                    ...deck,
                    cards: deck.cards.map(card =>
                        card.id === cardId ? updatedCard : card
                    )
                }
                : deck
        ));
    };

    // Remove card específico de um deck
    const removeCardFromDeck = (deckId: number, cardId: number) => {
        setDecks(prev => prev.map(deck =>
            deck.id === deckId
                ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
                : deck
        ));
    };

    // Função reservada para futura implementação de atualização de dados
    const refreshDecks = async () => {
        // Esta função será implementada quando necessário
    };

    return (
        <DeckContext.Provider
            value={{
                decks,
                setDecks,
                addDeck,
                updateDeck,
                removeDeck,
                addCardToDeck,
                updateCardInDeck,
                removeCardFromDeck,
                refreshDecks,
            }}
        >
            {children}
        </DeckContext.Provider>
    );
};