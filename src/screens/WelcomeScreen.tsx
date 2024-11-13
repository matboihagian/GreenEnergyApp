import React from 'react';
import { NativeBaseProvider, Box, Center } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ImageBackground, TouchableOpacity, Text } from 'react-native';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('../../assets/img/wallpaper.png')}
        style={WallpaperStyle.backgroundImage}
        resizeMode="cover"
      >
        <Center flex={1}>
          <Box>
            <TouchableOpacity
              style={ButtonStyle.button}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={ButtonStyle.buttonText}>Ir para Login</Text>
            </TouchableOpacity>
          </Box>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

export default WelcomeScreen;
