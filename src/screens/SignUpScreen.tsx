import React, { useState } from 'react';
import { NativeBaseProvider, Box, Center, Text } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ImageBackground, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      setMessage('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Erro desconhecido');
      } else {
        setMessage('Usuário registrado com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao cadastrar usuário.');
    }
  };

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('../../assets/img/wallpaper.png')}
        style={WallpaperStyle.backgroundImage}
        resizeMode="cover"
      >
        <Center flex={1}>
          <Box style={styles.container}>
            <TextInput
              placeholder="Nome de Usuário"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
            />
            <TextInput
              placeholder="Confirmar Senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
            />
            {message ? <Text color="red.500">{message}</Text> : null}
            <TouchableOpacity style={ButtonStyle.button} onPress={handleSignUp} activeOpacity={0.7}>
              <Text style={ButtonStyle.buttonText}>Criar Conta</Text>
            </TouchableOpacity>
          </Box>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo translúcido para contraste
    borderRadius: 8,
  },
  input: {
    height: 45,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fundo translúcido nos campos de entrada
    borderColor: '#5add75', // Borda verde suave
    borderWidth: 1,
    borderRadius: 8,
  },
});
