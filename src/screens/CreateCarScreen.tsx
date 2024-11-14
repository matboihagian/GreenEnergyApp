import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

type CreateCarScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateCar'>;

const CreateCarScreen: React.FC<CreateCarScreenProps> = ({ navigation }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(''); // Novo campo para o nível de bateria

  const createCar = async () => {
    if (!make || !model || !year || !ownerId || batteryLevel === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validar nível de bateria entre 0 e 100
    const batteryLevelNumber = parseInt(batteryLevel, 10);
    if (isNaN(batteryLevelNumber) || batteryLevelNumber < 0 || batteryLevelNumber > 100) {
      Alert.alert('Erro', 'O nível de bateria deve ser um valor entre 0 e 100.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/cars', {
        make,
        model,
        year: parseInt(year, 10),
        ownerId: parseInt(ownerId, 10),
        battery_level: batteryLevelNumber, // Envia o nível de bateria
      });

      Alert.alert('Sucesso', 'Carro criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar o carro:', error);
      Alert.alert('Erro', 'Não foi possível criar o carro.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/wallpaper.png')}
      style={WallpaperStyle.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Novo Carro</Text>
        
        <Text>Marca (Make)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Tesla"
          value={make}
          onChangeText={setMake}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Modelo (Model)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Model S"
          value={model}
          onChangeText={setModel}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Ano (Year)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2024"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>ID do Proprietário (OwnerId)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1"
          keyboardType="numeric"
          value={ownerId}
          onChangeText={setOwnerId}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Nível de Bateria (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 85"
          keyboardType="numeric"
          value={batteryLevel}
          onChangeText={setBatteryLevel}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <TouchableOpacity style={ButtonStyle.button} onPress={createCar} activeOpacity={0.7}>
          <Text style={ButtonStyle.buttonText}>Cadastrar Carro</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CreateCarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo translúcido para melhor contraste
    margin: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fundo translúcido para os campos de entrada
    borderRadius: 8,
  },
});
