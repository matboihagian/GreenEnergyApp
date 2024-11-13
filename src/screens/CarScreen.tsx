import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  ownerId: number;
}

type CarScreenProps = NativeStackScreenProps<RootStackParamList, 'Car'>;

const CarScreen: React.FC<CarScreenProps> = ({ navigation }) => {
  const [cars, setCars] = useState<Car[]>([]);

  const loadCars = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cars'); 
      setCars(response.data as Car[]);
    } catch (error) {
      console.error('Erro ao carregar os carros:', error);
      Alert.alert('Erro', 'Não foi possível carregar os carros.');
    }
  };

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
    <View style={styles.carItemContainer}>
      <Image source={require('../../assets/img/caricon.png')} style={styles.carIcon} />
      <View style={styles.carItem}>
        <Text style={styles.carText}>{item.make} {item.model} - {item.year}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={ButtonStyle.button}
            onPress={() => navigation.navigate('EditCar', { car: item })}
            activeOpacity={0.7}
          >
            <Text style={ButtonStyle.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ButtonStyle.button, { backgroundColor: 'rgba(255, 0, 0, 0.7)' }]}
            onPress={() => deleteCar(item.id)}
            activeOpacity={0.7}
          >
            <Text style={ButtonStyle.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/img/wallpaper.png')}
      style={WallpaperStyle.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('../../assets/img/caricon.png')} style={styles.carIcon} />
          <Text style={styles.title}>Carros Cadastrados</Text>
        </View>
        
        <FlatList
          data={cars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item.id.toString()}
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={ButtonStyle.button}
            onPress={() => navigation.navigate('CreateCar')}
            activeOpacity={0.7}
          >
            <Text style={ButtonStyle.buttonText}>Cadastrar Novo Carro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  carIcon: {
    width: 24,
    height: 24,
  },
  carItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco translúcido
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  carItem: {
    flex: 1,
    marginLeft: 8,
  },
  carText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttons: {
    marginTop: 16,
    alignItems: 'center',
  },
});
