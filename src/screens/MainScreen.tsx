import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen: React.FC = () => {
    const navigation = useNavigation<MainScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Button title="Carros" onPress={() => navigation.navigate('Car')} />
            <Button title="Postos de Recarga" onPress={() => navigation.navigate('Recharge')} />
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
