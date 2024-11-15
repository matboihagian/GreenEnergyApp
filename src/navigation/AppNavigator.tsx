import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/MainScreen';
import CarScreen from '../screens/CarScreen';
import RechargeScreen from '../screens/RechargeScreen';
import CreateCarScreen from '../screens/CreateCarScreen';
import EditCarScreen from '../screens/EditCarScreen';
import CreateStation from '../screens/CreateStationScreen';
import EditStation from '../screens/EditStationScreen';
import Charging from '../screens/ChargingScreen'; // Importando ChargingScreen

// Definindo o RootStackParamList com os tipos de parâmetros para cada tela
export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    SignUp: undefined;
    Main: undefined;
    Car: undefined;
    Recharge: undefined;
    CreateCar: undefined;
    EditCar: { car: { id: number; make: string; model: string; year: number; ownerId: number; battery_level: number } };
    CreateStation: undefined;
    EditStation: { station: { id: number; location: string; capacity: number; status: string; potencia: string; energy_source: string } };
    ChargingScreen: { carId: number }; // Parâmetro para identificar o carro a ser carregado
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen 
                name="Welcome" 
                component={WelcomeScreen} 
                options={{ title: 'Tela Inicial' }} 
            />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ title: 'Acesse sua conta' }} 
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUpScreen} 
                options={{ title: 'Cadastrar' }} 
            />
            <Stack.Screen 
                name="Main" 
                component={MainScreen} 
                options={{ title: 'Tela Principal' }} 
            />
            <Stack.Screen 
                name="Car" 
                component={CarScreen} 
                options={{ title: 'Carros' }} 
            />
            <Stack.Screen 
                name="Recharge" 
                component={RechargeScreen} 
                options={{ title: 'Postos de Recarga' }} 
            />
            <Stack.Screen 
                name="CreateCar" 
                component={CreateCarScreen} 
                options={{ title: 'Cadastrar Novo Carro' }} 
            />
            <Stack.Screen 
                name="EditCar" 
                component={EditCarScreen} 
                options={{ title: 'Editar Carro' }} 
            />
            <Stack.Screen 
                name="CreateStation" 
                component={CreateStation} 
                options={{ title: 'Cadastrar Novo Ponto de Recarga' }} 
            />
            <Stack.Screen 
                name="EditStation" 
                component={EditStation} 
                options={{ title: 'Editar Ponto de Recarga' }} 
            />
            <Stack.Screen 
                name="ChargingScreen" 
                component={Charging} 
                options={{ title: 'Carregar Carro' }} 
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
