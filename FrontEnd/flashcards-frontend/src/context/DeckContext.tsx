import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Deck, Card } from '../types';

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

const DeckContext = createContext<DeckContextData>({} as DeckContextData);

export const useDeck = () => useContext(DeckContext);

interface DeckProviderProps {
    children: ReactNode;
}

export const DeckProvider: React.FC<DeckProviderProps> = ({ children }) => {
    const [decks, setDecks] = useState<Deck[]>([]);

    const addDeck = (deck: Deck) => {
        setDecks(prev => [deck, ...prev]);
    };

    const updateDeck = (deckId: number, updatedDeck: Deck) => {
        setDecks(prev => prev.map(deck =>
            deck.id === deckId ? updatedDeck : deck
        ));
    };

    const removeDeck = (deckId: number) => {
        setDecks(prev => prev.filter(deck => deck.id !== deckId));
    };

    const addCardToDeck = (deckId: number, card: Card) => {
        setDecks(prev => prev.map(deck =>
            deck.id === deckId
                ? { ...deck, cards: [...deck.cards, card] }
                : deck
        ));
    };

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

    const removeCardFromDeck = (deckId: number, cardId: number) => {
        setDecks(prev => prev.map(deck =>
            deck.id === deckId
                ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
                : deck
        ));
    };

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