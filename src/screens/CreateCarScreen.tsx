import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CreateCarScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateCar'>;

const CreateCarScreen: React.FC<CreateCarScreenProps> = ({ navigation }) => {
  // Estados para armazenar os valores do formulário
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [ownerId, setOwnerId] = useState('');

  // Função para criar um novo carro no backend
  const createCar = async () => {
    if (!make || !model || !year || !ownerId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/cars', {
        make,
        model,
        year: parseInt(year, 10),
        ownerId: parseInt(ownerId, 10),
      });

      Alert.alert('Sucesso', 'Carro criado com sucesso!');
      navigation.goBack(); // Volta para a tela anterior (lista de carros)
    } catch (error) {
      console.error('Erro ao criar o carro:', error);
      Alert.alert('Erro', 'Não foi possível criar o carro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Carro</Text>
      
      <Text>Marca (Make)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Toyota"
        value={make}
        onChangeText={setMake}
      />

      <Text>Modelo (Model)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Corolla"
        value={model}
        onChangeText={setModel}
      />

      <Text>Ano (Year)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2022"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />

      <Text>ID do Proprietário (OwnerId)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 1"
        keyboardType="numeric"
        value={ownerId}
        onChangeText={setOwnerId}
      />

      <Button title="Cadastrar Carro" onPress={createCar} />
    </View>
  );
};

export default CreateCarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
