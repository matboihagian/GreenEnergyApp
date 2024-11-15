import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WallpaperStyle from '../styles/WallpaperStyle';
import ButtonStyle from '../styles/ButtonStyle';

type RechargeStation = {
  id: number;
  location: string;
  capacity: number;
  status: string;
  potencia: string;
  energy_source: string; // Adicionando a propriedade de Fonte de Energia
};

type RechargeScreenProps = NativeStackScreenProps<RootStackParamList, 'Recharge'>;

const RechargeScreen: React.FC<RechargeScreenProps> = ({ navigation }) => {
  const [stations, setStations] = useState<RechargeStation[]>([]);

  const loadStations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/charging-stations');
      setStations(response.data as RechargeStation[]);
    } catch (error) {
      console.error('Erro ao carregar os pontos de recarga:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pontos de recarga.');
    }
  };

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

  const renderStationItem = ({ item }: { item: RechargeStation }) => (
    <View style={styles.stationItemContainer}>
      <View style={styles.stationItem}>
        <Text style={styles.stationText}>
          Local: {item.location} | Capacidade: {item.capacity} | Status: {item.status} | Potência: {item.potencia} | Fonte de Energia: {item.energy_source}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={ButtonStyle.button}
            onPress={() => navigation.navigate('EditStation', { station: item })}
            activeOpacity={0.7}
          >
            <Image source={require('../../assets/img/botao-editar.png')} style={styles.icon} />
            <Text style={ButtonStyle.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ButtonStyle.button, { backgroundColor: 'rgba(255, 0, 0, 0.7)' }]}
            onPress={() => deleteStation(item.id)}
            activeOpacity={0.7}
          >
            <Image source={require('../../assets/img/lixeira.png')} style={styles.icon} />
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
        <Text style={styles.title}>Pontos de Recarga</Text>

        <FlatList
          data={stations}
          renderItem={renderStationItem}
          keyExtractor={(item) => item.id.toString()}
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={ButtonStyle.button}
            onPress={() => navigation.navigate('CreateStation')}
            activeOpacity={0.7}
          >
            <Text style={ButtonStyle.buttonText}>Adicionar Novo Ponto de Recarga</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
    textAlign: 'center',
  },
  stationItemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  stationItem: {
    flex: 1,
  },
  stationText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttons: {
    marginTop: 16,
    alignItems: 'center',
  },
});
