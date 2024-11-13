import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CreateStationScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateStation'>;

const CreateStationScreen: React.FC<CreateStationScreenProps> = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('');

  const createStation = async () => {
    if (!location || !capacity || !status) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/charging-stations', {
        location,
        capacity: parseInt(capacity, 10),
        status,
      });

      Alert.alert('Sucesso', 'Ponto de recarga criado com sucesso!');
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      console.error('Erro ao criar o ponto de recarga:', error);
      Alert.alert('Erro', 'Não foi possível criar o ponto de recarga.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Ponto de Recarga</Text>
      
      <Text>Localização</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Centro da Cidade"
        value={location}
        onChangeText={setLocation}
      />

      <Text>Capacidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 4"
        keyboardType="numeric"
        value={capacity}
        onChangeText={setCapacity}
      />

      <Text>Status</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Ativo"
        value={status}
        onChangeText={setStatus}
      />

      <Button title="Cadastrar Ponto de Recarga" onPress={createStation} />
    </View>
  );
};

export default CreateStationScreen;

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
