import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type EditCarScreenProps = NativeStackScreenProps<RootStackParamList, 'EditCar'>;

const EditCarScreen: React.FC<EditCarScreenProps> = ({ route, navigation }) => {
  // Dados do carro passado como parâmetro
  const { car } = route.params;

  // Estados para armazenar os valores do formulário, inicializados com os valores do carro
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year.toString());
  const [ownerId, setOwnerId] = useState(car.ownerId.toString());

  // Função para salvar as alterações do carro no backend
  const saveCar = async () => {
    if (!make || !model || !year || !ownerId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/cars/${car.id}`, {
        make,
        model,
        year: parseInt(year, 10),
        ownerId: parseInt(ownerId, 10),
      });

      Alert.alert('Sucesso', 'Carro atualizado com sucesso!');
      navigation.goBack(); // Volta para a tela anterior (lista de carros)
    } catch (error) {
      console.error('Erro ao atualizar o carro:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o carro.');
    }
  };

  // Função para excluir o carro no backend
  const deleteCar = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cars/${car.id}`);
      Alert.alert('Sucesso', 'Carro excluído com sucesso!');
      navigation.goBack(); // Volta para a tela anterior (lista de carros)
    } catch (error) {
      console.error('Erro ao excluir o carro:', error);
      Alert.alert('Erro', 'Não foi possível excluir o carro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Carro</Text>

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

      <Button title="Salvar Alterações" onPress={saveCar} />
      <View style={{ marginTop: 10 }}>
        <Button title="Excluir Carro" color="red" onPress={deleteCar} />
      </View>
    </View>
  );
};

export default EditCarScreen;

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
