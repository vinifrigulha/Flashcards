import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { DeckProvider } from './src/context/DeckContext';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { RegisterScreen } from './src/screens/auth/RegisterScreen';
import { DecksScreen } from './src/screens/decks/DecksScreen';
import { CreateDeckScreen } from './src/screens/decks/CreateDeckScreen';
import { DeckCardsScreen } from './src/screens/cards/DeckCardsScreen';
import { CreateCardScreen } from './src/screens/cards/CreateCardScreen';
import { StudyDeckScreen } from './src/screens/cards/StudyDeckScreen';
import { RootStackParamList } from './src/types';
import Toast from 'react-native-toast-message';
import { ShareDeckScreen } from './src/screens/share/ShareDeckScreen';
import { UseShareCodeScreen } from './src/screens/share/UseShareCodeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Tela de carregamento durante a verificação de autenticação
const LoadingScreen: React.FC = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Carregando...</Text>
  </View>
);

// Define a navegação baseada no estado de autenticação
const AppNavigator: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <Stack.Navigator>
        {!isAuthenticated ? (
          // Rotas públicas - usuário não autenticado
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: 'Criar Conta',
                headerStyle: { backgroundColor: '#F5F5F5' },
                headerTransparent: true,
                headerTintColor: '#000',
              }}
            />
          </>
        ) : (
          // Rotas protegidas - usuário autenticado
          <>
            <Stack.Screen
              name="Decks"
              component={DecksScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateDeck"
              component={CreateDeckScreen}
              options={{
                title: 'Criar Deck',
                headerStyle: { backgroundColor: '#F5F5F5' },
              }}
            />
            <Stack.Screen
              name="DeckCards"
              component={DeckCardsScreen}
              options={{
                title: 'Cards do Deck',
                headerStyle: { backgroundColor: '#F5F5F5' },
              }}
            />
            <Stack.Screen
              name="CreateCard"
              component={CreateCardScreen}
              options={{
                title: 'Novo Card',
                headerStyle: { backgroundColor: '#F5F5F5' },
              }}
            />
            <Stack.Screen
              name="StudyDeck"
              component={StudyDeckScreen}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="ShareDeck"
              component={ShareDeckScreen}
              options={{
                title: 'Compartilhar Deck',
                headerStyle: { backgroundColor: '#F5F5F5' },
              }}
            />
            <Stack.Screen
              name="UseShareCode"
              component={UseShareCodeScreen}
              options={{
                title: 'Usar Código',
                headerStyle: { backgroundColor: '#F5F5F5' },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </ErrorBoundary>
  );
};

// Configuração personalizada para notificações Toast
const toastConfig = {
  success: (props: any) => (
    <View style={{
      backgroundColor: '#4CAF50',
      padding: 15,
      marginHorizontal: 20,
      marginTop: 40,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <Text style={{ color: 'white', fontSize: 18, marginRight: 10 }}>✅</Text>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'white',
        }}>
          {props.text1}
        </Text>
      </View>
    </View>
  ),
  error: (props: any) => (
    <View style={{
      backgroundColor: '#ff3b30',
      padding: 15,
      marginHorizontal: 20,
      marginTop: 40,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <Text style={{ color: 'white', fontSize: 18, marginRight: 10 }}>⚠️</Text>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 2
        }}>
          {props.text1}
        </Text>
        <Text style={{
          fontSize: 14,
          color: 'white',
          opacity: 0.9
        }}>
          {props.text2}
        </Text>
      </View>
    </View>
  ),
};

// Componente raiz da aplicação com provedores de contexto
export default function App() {
  return (
    <AuthProvider>
      <DeckProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
          <Toast config={toastConfig} position='top' />
        </NavigationContainer>
      </DeckProvider>
    </AuthProvider>
  );
}

// Estilos usados para centralizar elementos na tela e formatar o texto de carregamento
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});