import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Deck, Card } from './index';

// Define todas as rotas disponíveis na aplicação e seus parâmetros
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Decks: undefined;
    CreateDeck: undefined;
    DeckCards: {
        deck: Deck;
        onDeckUpdated?: (updatedDeck: Deck) => void;
    };
    CreateCard: { deckId: number };
    StudyDeck: {
        deck: Deck;
        cards: Card[];
    };
    ShareDeck: { deck: Deck };
    UseShareCode: undefined;
};

// Tipos de props de navegação para cada tela (TypeScript)
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
export type DecksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Decks'>;
export type CreateDeckScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateDeck'>;
export type DeckCardsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeckCards'>;
export type CreateCardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCard'>;
export type StudyDeckScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudyDeck'>;
export type ShareDeckScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShareDeck'>;
export type UseShareCodeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UseShareCode'>;