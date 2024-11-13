import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type RechargeStation = {
  id: number;
  location: string;
  capacity: number;
  status: string;
};

type RechargeScreenProps = NativeStackScreenProps<RootStackParamList, 'Recharge'>;

const RechargeScreen: React.FC<RechargeScreenProps> = ({ navigation }) => {
  const [stations, setStations] = useState<RechargeStation[]>([]);

  // Função para carregar os pontos de recarga do backend
  const loadStations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/charging-stations'); 
      setStations(response.data as RechargeStation[]);
    } catch (error) {
      console.error('Erro ao carregar os pontos de recarga:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pontos de recarga.');
    }
  };

  // Função para excluir um ponto de recarga
  const deleteStation = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/charging-stations/${id}`);
      setStations((prevStations) => prevStations.filter((station) => station.id !== id));
      Alert.alert('Sucesso', 'Ponto de recarga excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir o ponto de recarga:', error);
      Alert.alert('Erro', 'Não foi possível excluir o ponto de recarga.');
    }
  };

  useEffect(() => {
    loadStations();
  }, []);

  // Renderização de cada item da lista de pontos de recarga
  const renderStationItem = ({ item }: { item: RechargeStation }) => (
    <View style={styles.stationItem}>
      <Text>{item.location} - Capacidade: {item.capacity} - Status: {item.status}</Text>
      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditStation', { station: item })} // Navega para a tela de edição
        />
        <Button
          title="Excluir"
          color="red"
          onPress={() => deleteStation(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pontos de Recarga</Text>
      
      <FlatList
        data={stations}
        renderItem={renderStationItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.buttons}>
        <Button title="Adicionar Novo Ponto de Recarga" onPress={() => navigation.navigate('CreateStation')} />
      </View>
    </View>
  );
};

export default RechargeScreen;

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
  stationItem: {
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
