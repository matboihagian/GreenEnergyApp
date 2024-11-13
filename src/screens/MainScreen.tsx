import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen: React.FC = () => {
    const navigation = useNavigation<MainScreenNavigationProp>();

    return (
        <ImageBackground
            source={require('../../assets/img/wallpaper.png')}
            style={WallpaperStyle.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={ButtonStyle.button}
                    onPress={() => navigation.navigate('Car')}
                    activeOpacity={0.7}
                >
                    <Image
                        source={require('../../assets/img/caricon.png')}
                        style={styles.icon}
                    />
                    <Text style={ButtonStyle.buttonText}>Carros</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[ButtonStyle.button, { marginTop: 16 }]}
                    onPress={() => navigation.navigate('Recharge')}
                    activeOpacity={0.7}
                >
                    <Image
                        source={require('../../assets/img/fuelpumpicon.png')}
                        style={styles.icon}
                    />
                    <Text style={ButtonStyle.buttonText}>Postos de Recarga</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8, // Espaçamento entre o ícone e o texto
    },
});
