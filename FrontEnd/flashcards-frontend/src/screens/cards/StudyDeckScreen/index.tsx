import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Modal,
    Image,
    TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card, Deck } from '../../../types';
import { StudyDeckScreenNavigationProp } from '../../../types/navigation';
import styles from './styles';

type RouteParams = {
    deck: Deck;
    cards: Card[];
};

type StudyResult = {
    totalCards: number;
    correctAnswers: number;
    wrongAnswers: number;
    percentage: number;
};

type ExerciseType = 'flashcard' | 'multipleChoice' | 'typing';
type StudyMode = 'flashcard' | 'multipleChoice' | 'typing' | 'random';

export const StudyDeckScreen: React.FC = () => {
    // Estados do estudo
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
    const [studyCompleted, setStudyCompleted] = useState(false);
    const [exitModalVisible, setExitModalVisible] = useState(false);

    // Estados do modo de estudo
    const [modeSelectionVisible, setModeSelectionVisible] = useState(true);
    const [selectedMode, setSelectedMode] = useState<StudyMode>('random');
    const [userAnswer, setUserAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [currentExerciseType, setCurrentExerciseType] = useState<ExerciseType>('flashcard');
    const [studyCards, setStudyCards] = useState<Card[]>([]);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);

    const navigation = useNavigation<StudyDeckScreenNavigationProp>();
    const route = useRoute();
    const { deck, cards } = route.params as RouteParams;

    const progress = ((currentCardIndex + 1) / studyCards.length) * 100;

    // Seleção do modo de estudo
    const handleModeSelection = (mode: StudyMode) => {
        setSelectedMode(mode);
        setModeSelectionVisible(false);

        if (mode === 'multipleChoice' && !canUseMultipleChoice()) {
            Alert.alert(
                'Modo não disponível',
                'O modo múltipla escolha requer:\n• Pelo menos 4 cards no deck\n• Pelo menos 4 respostas diferentes\n\nVerifique se todos os cards têm respostas distintas.',
                [{ text: 'OK', onPress: () => setModeSelectionVisible(true) }]
            );
            return;
        }

        if (mode === 'random') {
            generateRandomExercise();
        } else {
            setCurrentExerciseType(mode);
            if (mode === 'multipleChoice') {
                generateMultipleChoiceOptions();
            }
        }
    };

    // Verifica se o modo múltipla escolha pode ser usado
    const canUseMultipleChoice = () => {
        if (deck.cards.length < 4) {
            return false;
        }

        const validCards = deck.cards.filter(card =>
            card.answer &&
            card.answer.trim() !== '' &&
            card.answer.length > 0
        );

        const uniqueAnswers = [...new Set(validCards.map(card => card.answer.trim()))];
        return uniqueAnswers.length >= 4;
    };

    // Efeito para gerar exercícios quando o card muda
    useEffect(() => {
        if (cards.length === 0) {
            Alert.alert('Aviso', 'Não há cards para estudar neste deck');
            navigation.goBack();
            return;
        }

        if (!modeSelectionVisible && currentCard && studyCards.length > 0) {
            if (selectedMode === 'random') {
                generateRandomExercise();
            } else {
                setCurrentExerciseType(selectedMode);
                if (selectedMode === 'multipleChoice' && canUseMultipleChoice()) {
                    generateMultipleChoiceOptions();
                }
            }
        }
    }, [currentCardIndex, studyCards, selectedMode, modeSelectionVisible]);

    // Efeito para atualizar o card atual e gerar opções
    useEffect(() => {
        if (studyCards.length > 0 && currentCardIndex < studyCards.length) {
            const newCard = studyCards[currentCardIndex];
            setCurrentCard(newCard);

            if (!modeSelectionVisible && newCard) {
                if (selectedMode === 'multipleChoice' && canUseMultipleChoice()) {
                    generateMultipleChoiceOptions(newCard);
                } else if (selectedMode === 'random' && currentExerciseType === 'multipleChoice') {
                    generateMultipleChoiceOptions(newCard);
                }
            }
        } else {
            setCurrentCard(null);
        }
    }, [studyCards, currentCardIndex, modeSelectionVisible, selectedMode]);

    // Inicializar cards de estudo embaralhados
    useEffect(() => {
        if (cards.length > 0 && studyCards.length === 0) {
            const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
            setStudyCards(shuffledCards);
        }
    }, [cards]);

    // Gera tipo de exercício aleatório balanceado
    const generateRandomExercise = () => {
        if (!currentCard) return;

        const exerciseTypes: ExerciseType[] = ['flashcard', 'multipleChoice', 'typing'];

        const availableTypes = exerciseTypes.filter(type => {
            if (type === 'multipleChoice' && !canUseMultipleChoice()) return false;
            return true;
        });

        if (availableTypes.length === 1) {
            setCurrentExerciseType(availableTypes[0]);
            if (availableTypes[0] === 'multipleChoice') {
                generateMultipleChoiceOptions();
            }
            return;
        }

        // Conta tipos usados para balancear
        const usedTypes = studyCards.slice(0, currentCardIndex).map((card, index) => {
            return availableTypes[index % availableTypes.length];
        });

        const typeCount: Record<ExerciseType, number> = {
            flashcard: 0,
            multipleChoice: 0,
            typing: 0
        };

        usedTypes.forEach(type => {
            typeCount[type]++;
        });

        // Seleciona o tipo menos usado para balanceamento
        let leastUsedType: ExerciseType = availableTypes[0];
        let minCount = typeCount[leastUsedType];

        availableTypes.forEach(type => {
            if (typeCount[type] < minCount) {
                leastUsedType = type;
                minCount = typeCount[type];
            }
        });

        const useLeastUsed = Math.random() < 0.7;
        const selectedType = useLeastUsed ? leastUsedType :
            availableTypes[Math.floor(Math.random() * availableTypes.length)];

        setCurrentExerciseType(selectedType);

        if (selectedType === 'multipleChoice') {
            generateMultipleChoiceOptions();
        }
    };

    // Gera opções para múltipla escolha
    const generateMultipleChoiceOptions = (card?: Card) => {
        const targetCard = card || currentCard;
        if (!targetCard) return;

        const correctAnswer = targetCard.answer;

        // Buscar cards para respostas erradas
        const otherCards = deck.cards.filter(card =>
            card.id !== targetCard.id &&
            card.answer &&
            card.answer.trim() !== ''
        );

        // Buscar respostas erradas únicas
        const wrongAnswers = [...new Set(
            otherCards.map(card => card.answer)
        )].sort(() => Math.random() - 0.5);

        // Fallback se não há respostas erradas suficientes
        if (wrongAnswers.length < 3) {
            const allOptions = [correctAnswer];
            wrongAnswers.forEach(wrong => {
                if (allOptions.length < 4 && wrong !== correctAnswer) {
                    allOptions.push(wrong);
                }
            });

            while (allOptions.length < 4) {
                allOptions.push(`Opção ${allOptions.length + 1}`);
            }

            setOptions(allOptions.sort(() => Math.random() - 0.5));
            return;
        }

        // Caso normal: 1 correta + 3 erradas
        const selectedWrongAnswers = wrongAnswers.slice(0, 3);
        const filteredWrongAnswers = selectedWrongAnswers.filter(answer => answer !== correctAnswer);

        // Completar com outras respostas se necessário
        while (filteredWrongAnswers.length < 3 && wrongAnswers.length > filteredWrongAnswers.length) {
            const extraAnswer = wrongAnswers.find(w =>
                w !== correctAnswer && !filteredWrongAnswers.includes(w)
            );
            if (extraAnswer) {
                filteredWrongAnswers.push(extraAnswer);
            } else {
                break;
            }
        }

        let allOptions = [correctAnswer, ...filteredWrongAnswers.slice(0, 3)];

        // Validações de segurança
        const hasCorrectAnswer = allOptions.includes(correctAnswer);
        if (!hasCorrectAnswer) {
            allOptions[0] = correctAnswer;
        }

        // Validação final do número de respostas corretas
        const finalCorrectCount = allOptions.filter(option => option === correctAnswer).length;
        if (finalCorrectCount !== 1) {
            const forcedOptions = [correctAnswer, ...wrongAnswers.slice(0, 3)];
            setOptions(forcedOptions.sort(() => Math.random() - 0.5));
            return;
        }

        setOptions(allOptions.sort(() => Math.random() - 0.5));
    };

    // Handlers de respostas
    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleMultipleChoiceAnswer = (selected: string) => {
        if (!currentCard) return;

        setSelectedOption(selected);
        const isCorrect = selected === currentCard.answer;

        setTimeout(() => {
            if (isCorrect) {
                setCorrectAnswers(prev => [...prev, currentCard.id]);
            } else {
                setWrongAnswers(prev => [...prev, currentCard.id]);
            }
            goToNextCard();
        }, 1000);
    };

    const handleTypingAnswer = () => {
        if (!currentCard) return;

        if (!userAnswer.trim()) {
            Alert.alert('Erro', 'Digite sua resposta');
            return;
        }

        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        const normalizedCorrectAnswer = currentCard.answer.trim().toLowerCase();
        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

        setShowAnswer(true);

        setTimeout(() => {
            if (isCorrect) {
                setCorrectAnswers(prev => [...prev, currentCard.id]);
            } else {
                setWrongAnswers(prev => [...prev, currentCard.id]);
            }
            goToNextCard();
        }, 2000);
    };

    const handleFlashcardAnswer = (remembered: boolean) => {
        if (!currentCard) return;

        if (remembered) {
            setCorrectAnswers(prev => [...prev, currentCard.id]);
        } else {
            setWrongAnswers(prev => [...prev, currentCard.id]);
        }
        goToNextCard();
    };

    const goToNextCard = () => {
        if (currentCardIndex < studyCards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setShowAnswer(false);
            setUserAnswer('');
            setSelectedOption(null);
            setOptions([]);
        } else {
            setStudyCompleted(true);
        }
    };

    // Navegação e modais
    const handleExit = () => {
        setExitModalVisible(true);
    };

    const confirmExit = () => {
        setExitModalVisible(false);
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Decks' },
                { name: 'DeckCards', params: { deck } }
            ],
        });
    };

    const cancelExit = () => {
        setExitModalVisible(false);
    };

    // Cálculo dos resultados
    const getStudyResult = (): StudyResult => {
        const total = studyCards.length;
        const correct = correctAnswers.length;
        const wrong = wrongAnswers.length;
        const percentage = Math.round((correct / total) * 100);

        return {
            totalCards: total,
            correctAnswers: correct,
            wrongAnswers: wrong,
            percentage,
        };
    };

    // Renderização dos tipos de exercício
    const renderExerciseType = () => {
        switch (currentExerciseType) {
            case 'multipleChoice':
                return renderMultipleChoice();
            case 'typing':
                return renderTyping();
            case 'flashcard':
            default:
                return renderFlashcard();
        }
    };

    const renderMultipleChoice = () => {
        if (!currentCard || options.length === 0) return (
            <View style={styles.multipleChoiceContainer}>
                <Text style={styles.exerciseTitle}>Carregando opções...</Text>
                <ActivityIndicator size="small" color="#007AFF" />
            </View>
        );

        return (
            <View style={styles.multipleChoiceContainer}>
                <Text style={styles.exerciseTitle}>Selecione a resposta correta:</Text>
                {options.map((option, index) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentCard.answer;
                    const showResult = selectedOption !== null;

                    const getOptionStyle = () => {
                        if (showResult) {
                            if (isCorrect) return styles.correctOption;
                            if (isSelected && !isCorrect) return styles.wrongOption;
                        }
                        if (isSelected) return styles.selectedOption;
                        return styles.multipleChoiceOption;
                    };

                    const getTextStyle = () => {
                        if (showResult) {
                            if (isCorrect) return styles.correctOptionText;
                            if (isSelected && !isCorrect) return styles.wrongOptionText;
                        }
                        if (isSelected) return styles.selectedOptionText;
                        return styles.multipleChoiceText;
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            style={getOptionStyle()}
                            onPress={() => !showResult && handleMultipleChoiceAnswer(option)}
                            disabled={showResult}
                        >
                            <Text style={getTextStyle()}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderTyping = () => {
        if (!currentCard) return null;

        return (
            <View style={styles.typingContainer}>
                <Text style={styles.exerciseTitle}>Digite a resposta:</Text>

                <TextInput
                    style={styles.typingInput}
                    value={userAnswer}
                    onChangeText={setUserAnswer}
                    placeholder="Digite sua resposta aqui..."
                    placeholderTextColor="#999"
                    editable={!showAnswer}
                    multiline
                />

                {showAnswer && (
                    <View style={styles.typingFeedback}>
                        <Text style={[
                            styles.feedbackText,
                            userAnswer.trim().toLowerCase() === currentCard.answer.trim().toLowerCase()
                                ? styles.correctFeedback
                                : styles.wrongFeedback
                        ]}>
                            {userAnswer.trim().toLowerCase() === currentCard.answer.trim().toLowerCase()
                                ? '✅ Correto!'
                                : `❌ Resposta correta: ${currentCard.answer}`
                            }
                        </Text>
                    </View>
                )}

                {!showAnswer && (
                    <TouchableOpacity
                        style={[styles.submitButton, !userAnswer.trim() && styles.submitButtonDisabled]}
                        onPress={handleTypingAnswer}
                        disabled={!userAnswer.trim()}
                    >
                        <Text style={styles.submitButtonText}>Verificar</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const renderFlashcard = () => {
        if (!currentCard) return null;

        return (
            <View style={styles.flashcardContainer}>
                {!showAnswer ? (
                    <TouchableOpacity
                        style={styles.showAnswerButton}
                        onPress={handleShowAnswer}
                    >
                        <Text style={styles.showAnswerButtonText}>
                            Mostrar Resposta
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.answerActions}>
                        <Text style={styles.rememberText}>
                            Você lembrou da resposta?
                        </Text>
                        <View style={styles.answerButtons}>
                            <TouchableOpacity
                                style={[styles.answerButton, styles.wrongButton]}
                                onPress={() => handleFlashcardAnswer(false)}
                            >
                                <Text style={styles.answerButtonText}>Não 😕</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.answerButton, styles.correctButton]}
                                onPress={() => handleFlashcardAnswer(true)}
                            >
                                <Text style={styles.answerButtonText}>Sim! 🎉</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    const getExerciseTypeIcon = () => {
        const mode = selectedMode === 'random' ? currentExerciseType : selectedMode;

        const iconMap = {
            flashcard: require('../../../../assets/icons/card.png'),
            multipleChoice: require('../../../../assets/icons/abcd.png'),
            typing: require('../../../../assets/icons/keyboard.png'),
        };

        return iconMap[mode] || require('../../../../assets/icons/dices.png');
    };

    // Tela de resultados
    if (studyCompleted) {
        const result = getStudyResult();

        return (
            <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Estudo Concluído! 🎉</Text>

                <View style={styles.resultCard}>
                    <Text style={styles.resultDeckName}>{deck.title}</Text>

                    <View style={styles.resultStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{result.totalCards}</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>

                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, styles.correctStat]}>{result.correctAnswers}</Text>
                            <Text style={styles.statLabel}>Acertos</Text>
                        </View>

                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, styles.wrongStat]}>{result.wrongAnswers}</Text>
                            <Text style={styles.statLabel}>Erros</Text>
                        </View>
                    </View>

                    <View style={styles.percentageContainer}>
                        <Text style={styles.percentageLabel}>Desempenho</Text>
                        <Text style={[
                            styles.percentageValue,
                            result.percentage >= 70 ? styles.goodPercentage :
                                result.percentage >= 50 ? styles.mediumPercentage :
                                    styles.badPercentage
                        ]}>
                            {result.percentage}%
                        </Text>
                    </View>

                    <View style={styles.resultMessage}>
                        <Text style={styles.resultMessageText}>
                            {result.percentage >= 90 ? 'Excelente! Você dominou este conteúdo! 🏆' :
                                result.percentage >= 70 ? 'Muito bom! Continue praticando! 👍' :
                                    result.percentage >= 50 ? 'Bom trabalho! Revise os cards que errou. 💪' :
                                        'Não desanime! Revise o conteúdo e tente novamente. 📚'}
                        </Text>
                    </View>
                </View>

                <View style={styles.resultActions}>
                    <TouchableOpacity
                        style={[styles.resultButton, styles.finishButton]}
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [
                                { name: 'Decks' },
                                { name: 'DeckCards', params: { deck } }
                            ],
                        })}
                    >
                        <Text style={styles.finishButtonText}>Voltar ao Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (!currentCard) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>
                    Carregando cards...
                </Text>
            </View>
        );
    }

    // Modal de seleção de modo de estudo
    if (modeSelectionVisible) {
        return (
            <View style={styles.modeSelectionContainer}>
                <View style={styles.modeSelectionHeader}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.exitButton}
                    >
                        <Text style={styles.exitButtonText}>×</Text>
                    </TouchableOpacity>

                    <Text style={styles.modeSelectionTitle}>Modo de Estudo</Text>

                    <View style={styles.headerPlaceholder} />
                </View>

                <View style={styles.modeSelectionContent}>
                    <Text style={styles.modeSelectionSubtitle}>
                        Como você quer estudar hoje?
                    </Text>

                    <View style={styles.modeOptions}>
                        <TouchableOpacity
                            style={styles.modeOption}
                            onPress={() => handleModeSelection('flashcard')}
                        >
                            <Image source={require('../../../../assets/icons/card.png')} style={styles.modeIcon} />
                            <Text style={styles.modeTitle}>Visualizar Resposta</Text>
                            <Text style={styles.modeDescription}>
                                Veja a pergunta e revele a resposta quando quiser
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.modeOption,
                                !canUseMultipleChoice() && styles.modeOptionDisabled
                            ]}
                            onPress={() => canUseMultipleChoice() && handleModeSelection('multipleChoice')}
                            disabled={!canUseMultipleChoice()}
                        >
                            <Image source={require('../../../../assets/icons/abcd.png')} style={styles.modeIcon} />
                            <Text style={styles.modeTitle}>Múltipla Escolha</Text>
                            <Text style={styles.modeDescription}>
                                Escolha a resposta correta
                                {!canUseMultipleChoice() && (
                                    <Text style={styles.requirementText}>
                                        {'\n'}Requer pelo menos 4 cards no deck
                                    </Text>
                                )}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.modeOption}
                            onPress={() => handleModeSelection('typing')}
                        >
                            <Image source={require('../../../../assets/icons/keyboard.png')} style={styles.modeIcon} />
                            <Text style={styles.modeTitle}>Modo Escrito</Text>
                            <Text style={styles.modeDescription}>
                                Digite a resposta correta
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.modeOption}
                            onPress={() => handleModeSelection('random')}
                        >
                            <Image source={require('../../../../assets/icons/dices.png')} style={styles.modeIcon} />
                            <Text style={styles.modeTitle}>Modo Aleatório</Text>
                            <Text style={styles.modeDescription}>
                                Mistura todos os modos de estudo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    // Tela principal de estudo
    return (
        <View style={styles.container}>
            {/* Modal de Confirmação de Saída */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={exitModalVisible}
                onRequestClose={cancelExit}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Interromper Estudo?</Text>
                        <Text style={styles.modalMessage}>
                            Deseja realmente interromper seus estudos?{'\n'}
                            Todo o seu progresso atual será perdido.
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={cancelExit}
                            >
                                <Text style={styles.cancelButtonText}>Continuar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.exitButtonModal]}
                                onPress={confirmExit}
                            >
                                <Text style={styles.exitButtonTextModal}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
                    <Text style={styles.exitButtonText}>×</Text>
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[styles.progressFill, { width: `${progress}%` }]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {currentCardIndex + 1} de {studyCards.length}
                    </Text>
                </View>

                <View style={styles.exerciseTypeIndicator}>
                    <TouchableOpacity
                        onPress={() => setModeSelectionVisible(true)}
                        style={styles.exerciseTypeButton}
                    >
                        <Image
                            source={getExerciseTypeIcon()}
                            style={styles.exerciseTypeImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Deck Info */}
            <View style={styles.deckInfo}>
                <Text style={styles.deckTitle}>{deck.title}</Text>
                {deck.description && (
                    <Text style={styles.deckDescription}>{deck.description}</Text>
                )}
            </View>

            {/* Card Content */}
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        {currentCard.question && !currentCard.questionImage && (
                            <Text style={styles.cardQuestion}>
                                {currentCard.question}
                            </Text>
                        )}

                        {!currentCard.question && currentCard.questionImage && (
                            <View style={styles.questionImageContainer}>
                                <Image
                                    source={{ uri: currentCard.questionImage }}
                                    style={styles.questionImage}
                                    resizeMode="contain"
                                />
                            </View>
                        )}

                        {currentCard.question && currentCard.questionImage && (
                            <>
                                <Text style={styles.cardQuestion}>
                                    {currentCard.question}
                                </Text>
                                <View style={styles.questionImageContainer}>
                                    <Image
                                        source={{ uri: currentCard.questionImage }}
                                        style={styles.questionImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </>
                        )}

                        {showAnswer && currentExerciseType === 'flashcard' && (
                            <View style={styles.answerSection}>
                                <View style={styles.divider} />
                                <Text style={styles.cardAnswer}>
                                    {currentCard.answer}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Exercise Area */}
            <View style={styles.exerciseContainer}>
                {renderExerciseType()}
            </View>
        </View>
    );
};