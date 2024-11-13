import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type EditStationScreenProps = NativeStackScreenProps<RootStackParamList, 'EditStation'>;

const EditStationScreen: React.FC<EditStationScreenProps> = ({ route, navigation }) => {
  const { station } = route.params;

  const [location, setLocation] = useState(station.location);
  const [capacity, setCapacity] = useState(station.capacity.toString());
  const [status, setStatus] = useState(station.status);

  const saveStation = async () => {
    if (!location || !capacity || !status) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/charging-stations/${station.id}`, {
        location,
        capacity: parseInt(capacity, 10),
        status,
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
    <View style={styles.container}>
      <Text style={styles.title}>Editar Ponto de Recarga</Text>

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

      <Button title="Salvar Alterações" onPress={saveStation} />
      <View style={{ marginTop: 10 }}>
        <Button title="Excluir Ponto de Recarga" color="red" onPress={deleteStation} />
      </View>
    </View>
  );
};

export default EditStationScreen;

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
