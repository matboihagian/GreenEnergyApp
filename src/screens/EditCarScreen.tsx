import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

type EditCarScreenProps = NativeStackScreenProps<RootStackParamList, 'EditCar'>;

const EditCarScreen: React.FC<EditCarScreenProps> = ({ route, navigation }) => {
  const { car } = route.params;

  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year.toString());
  const [ownerId, setOwnerId] = useState(car.ownerId.toString());
  const [batteryLevel, setBatteryLevel] = useState(car.battery_level.toString());

  const saveCar = async () => {
    if (!make || !model || !year || !ownerId || batteryLevel === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const batteryLevelNumber = parseInt(batteryLevel, 10);
    if (isNaN(batteryLevelNumber) || batteryLevelNumber < 0 || batteryLevelNumber > 100) {
      Alert.alert('Erro', 'O nível de bateria deve ser um valor entre 0 e 100.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/cars/${car.id}`, {
        make,
        model,
        year: parseInt(year, 10),
        ownerId: parseInt(ownerId, 10),
        battery_level: batteryLevelNumber,
      });

      Alert.alert('Sucesso', 'Carro atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar o carro:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o carro.');
    }
  };

  const deleteCar = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cars/${car.id}`);
      Alert.alert('Sucesso', 'Carro excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir o carro:', error);
      Alert.alert('Erro', 'Não foi possível excluir o carro.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/wallpaper.png')}
      style={WallpaperStyle.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Editar Carro</Text>

        <Text>Marca (Make)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Toyota"
          value={make}
          onChangeText={setMake}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Modelo (Model)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Corolla"
          value={model}
          onChangeText={setModel}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Ano (Year)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2022"
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

        <TouchableOpacity style={ButtonStyle.button} onPress={saveCar} activeOpacity={0.7}>
          <Text style={ButtonStyle.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ButtonStyle.button, { backgroundColor: 'rgba(255, 0, 0, 0.7)', marginTop: 16 }]}
          onPress={deleteCar}
          activeOpacity={0.7}
        >
          <Image source={require('../../assets/img/lixeira.png')} style={styles.icon} />
          <Text style={ButtonStyle.buttonText}>Excluir Carro</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default EditCarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo translúcido para contraste
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fundo translúcido nos campos de entrada
    borderRadius: 8,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});
