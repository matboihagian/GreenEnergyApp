import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';
import { Picker } from '@react-native-picker/picker';

type EditStationScreenProps = NativeStackScreenProps<RootStackParamList, 'EditStation'>;

const EditStationScreen: React.FC<EditStationScreenProps> = ({ route, navigation }) => {
  const { station } = route.params;

  const [location, setLocation] = useState(station.location);
  const [capacity, setCapacity] = useState(station.capacity.toString());
  const [status, setStatus] = useState(station.status);
  const [potencia, setPotencia] = useState(station.potencia);
  const [energySource, setEnergySource] = useState(station.energy_source); // Estado para Fonte de Energia

  const saveStation = async () => {
    // Verificação para garantir que todos os campos estão preenchidos
    if (!location || !capacity || !status || !potencia || !energySource) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Enviar dados de atualização para o backend
      await axios.put(`http://localhost:3000/api/charging-stations/${station.id}`, {
        location,
        capacity: parseInt(capacity, 10),
        status,
        potencia,
        energy_source: energySource,
      });

      Alert.alert('Sucesso', 'Ponto de recarga atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar o ponto de recarga:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o ponto de recarga.');
    }
  };

  const deleteStation = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/charging-stations/${station.id}`);
      Alert.alert('Sucesso', 'Ponto de recarga excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir o ponto de recarga:', error);
      Alert.alert('Erro', 'Não foi possível excluir o ponto de recarga.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/wallpaper.png')}
      style={WallpaperStyle.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Editar Ponto de Recarga</Text>

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

        <TouchableOpacity style={ButtonStyle.button} onPress={saveStation} activeOpacity={0.7}>
          <Text style={ButtonStyle.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ButtonStyle.button, { backgroundColor: 'rgba(255, 0, 0, 0.7)', marginTop: 16 }]}
          onPress={deleteStation}
          activeOpacity={0.7}
        >
          <Image source={require('../../assets/img/lixeira.png')} style={styles.icon} />
          <Text style={ButtonStyle.buttonText}>Excluir Ponto de Recarga</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default EditStationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
