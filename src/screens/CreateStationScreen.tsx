import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';
import { Picker } from '@react-native-picker/picker'; // Import do Picker

type CreateStationScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateStation'>;

const CreateStationScreen: React.FC<CreateStationScreenProps> = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('');
  const [potencia, setPotencia] = useState('1,4kW'); // Valor inicial para Potência
  const [energySource, setEnergySource] = useState('Energia Eólica'); // Valor inicial para Fonte de Energia

  const createStation = async () => {
    if (!location || !capacity || !status || !potencia || !energySource) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/charging-stations', {
        location,
        capacity: parseInt(capacity, 10),
        status,
        potencia,
        energy_source: energySource, // Nova informação enviada ao backend
      });

      Alert.alert('Sucesso', 'Ponto de recarga criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar o ponto de recarga:', error);
      Alert.alert('Erro', 'Não foi possível criar o ponto de recarga.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/wallpaper.png')}
      style={WallpaperStyle.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Novo Ponto de Recarga</Text>
        
        <Text>Localização</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Centro da Cidade"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Capacidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 4"
          keyboardType="numeric"
          value={capacity}
          onChangeText={setCapacity}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Status</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ativo"
          value={status}
          onChangeText={setStatus}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <Text>Potência</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={potencia}
            onValueChange={(itemValue) => setPotencia(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="1,4kW" value="1,4kW" />
            <Picker.Item label="22kW" value="22kW" />
            <Picker.Item label="50kW" value="50kW" />
          </Picker>
        </View>

        <Text>Fonte de Energia</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={energySource}
            onValueChange={(itemValue) => setEnergySource(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Energia Eólica" value="Energia Eólica" />
            <Picker.Item label="Energia Solar" value="Energia Solar" />
            <Picker.Item label="Energia Hidroelétrica" value="Energia Hidroelétrica" />
          </Picker>
        </View>

        <TouchableOpacity style={ButtonStyle.button} onPress={createStation} activeOpacity={0.7}>
          <Text style={ButtonStyle.buttonText}>Cadastrar Ponto de Recarga</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CreateStationScreen;

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
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  picker: {
    height: 40,
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
