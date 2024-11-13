import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Definindo a interface para o tipo Carro
interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  ownerId: number;
}

// Tipagem para as propriedades de navegação
type CarScreenProps = NativeStackScreenProps<RootStackParamList, 'Car'>;

const CarScreen: React.FC<CarScreenProps> = ({ navigation }) => {
  const [cars, setCars] = useState<Car[]>([]);

  // Função para carregar os carros do backend
  const loadCars = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cars'); 
      setCars(response.data as Car[]);  // Definindo o tipo da resposta como Car[]
    } catch (error) {
      console.error('Erro ao carregar os carros:', error);
      Alert.alert('Erro', 'Não foi possível carregar os carros.');
    }
  };

  // Função para excluir um carro
  const deleteCar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      Alert.alert('Sucesso', 'Carro excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir o carro:', error);
      Alert.alert('Erro', 'Não foi possível excluir o carro.');
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const renderCarItem = ({ item }: { item: Car }) => (
    <View style={styles.carItem}>
      <Text>{item.make} {item.model} - {item.year}</Text>
      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditCar', { car: item })}
        />
        <Button
          title="Excluir"
          color="red"
          onPress={() => deleteCar(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carros Cadastrados</Text>
      
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.buttons}>
        <Button title="Cadastrar Novo Carro" onPress={() => navigation.navigate('CreateCar')} />
      </View>
    </View>
  );
};

export default CarScreen;

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
  carItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttons: {
    marginTop: 16,
  },
});
