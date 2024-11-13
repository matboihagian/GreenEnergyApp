import React, { useState } from 'react';
import { NativeBaseProvider, Box, Center, Input } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Alert as RNAlert, ImageBackground, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { login } from '../api/auth';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      console.log('Token:', token);
      RNAlert.alert('Login realizado com sucesso!');
      navigation.navigate('Main');
    } catch (err: unknown) {
      if (err instanceof Error) {
        RNAlert.alert('Erro', err.message);
      } else {
        RNAlert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
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
          <Box>
            <Input
              placeholder="Usuário"
              mb={4}
              value={username}
              onChangeText={setUsername}
              backgroundColor="rgba(255, 255, 255, 0.5)" // Menos transparente
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.5)" // Preto semi-transparente para o placeholder
              focusOutlineColor="#5add75" // Verde suave ao focar
            />
            <Input
              placeholder="Senha"
              mb={4}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              backgroundColor="rgba(255, 255, 255, 0.5)" // Menos transparente
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.5)" // Preto semi-transparente para o placeholder
              focusOutlineColor="#5add75" // Verde suave ao focar
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginTop: 16 }]}
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </Box>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  ...WallpaperStyle,
  ...ButtonStyle,
  button: {
    ...ButtonStyle.button,
    paddingVertical: 10, // Reduz o tamanho do botão
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Aumenta a transparência do fundo do botão
  },
  buttonText: {
    ...ButtonStyle.buttonText,
  },
  input: {
    borderRadius: 8, // Bordas arredondadas para os campos de entrada
  },
});
