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

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  ownerId: number;
  battery_level: number;
}

interface RechargeStation {
  id: number;
  location: string;
  capacity: number;
  status: string;
  potencia: string;
}

type ChargingScreenProps = NativeStackScreenProps<RootStackParamList, 'ChargingScreen'>;

const ChargingScreen: React.FC<ChargingScreenProps> = ({ route }) => {
  const { carId } = route.params;
  const [car, setCar] = useState<Car | null>(null);
  const [stations, setStations] = useState<RechargeStation[]>([]);
  const [chargingTime, setChargingTime] = useState<string | null>(null);

  const loadCar = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/cars/${carId}`);
      setCar(response.data as Car);
    } catch (error) {
      console.error('Erro ao carregar o carro:', error);
      Alert.alert('Erro', 'Não foi possível carregar o carro.');
    }
  };

  const loadStations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/charging-stations');
      setStations(response.data as RechargeStation[]);
    } catch (error) {
      console.error('Erro ao carregar os pontos de recarga:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pontos de recarga.');
    }
  };

  useEffect(() => {
    loadCar();
    loadStations();
  }, []);

  const calculateChargingTime = (potencia: string, batteryLevel: number) => {
    if (batteryLevel >= 100) {
      setChargingTime('O carro já está totalmente carregado.');
      return;
    }

    let totalChargingTime;

    switch (potencia) {
      case '1,4kW':
        totalChargingTime = 8 * 60; // 8 horas em minutos
        break;
      case '22kW':
        totalChargingTime = 3 * 60; // 3 horas em minutos
        break;
      case '50kW':
        totalChargingTime = 30; // 30 minutos
        break;
      default:
        Alert.alert('Erro', 'Potência desconhecida');
        return;
    }

    const remainingBattery = 100 - batteryLevel;
    const remainingTime = (remainingBattery / 100) * totalChargingTime;

    const hours = Math.floor(remainingTime / 60);
    const minutes = Math.floor(remainingTime % 60);

    setChargingTime(
      `Tempo estimado: ${hours > 0 ? `${hours} horas` : ''} ${minutes} minutos`
    );
  };

  const renderStationItem = ({ item }: { item: RechargeStation }) => (
    <View style={styles.stationItemContainer}>
      <Image source={require('../../assets/img/fuelpumpicon.png')} style={styles.icon} />
      <View style={styles.stationItem}>
        <Text style={styles.stationText}>
          {item.location} - Capacidade: {item.capacity} - Potência: {item.potencia} - Status:{' '}
          {item.status}
        </Text>
        <TouchableOpacity
          style={ButtonStyle.button}
          onPress={() => calculateChargingTime(item.potencia, car?.battery_level || 0)}
          activeOpacity={0.7}
        >
          <Text style={ButtonStyle.buttonText}>Carregar</Text>
        </TouchableOpacity>
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
        {car && (
          <View style={styles.carInfoContainer}>
            <Image source={require('../../assets/img/caricon.png')} style={styles.icon} />
            <Text style={styles.carText}>
              {car.make} {car.model} - {car.year}
            </Text>
            <Text style={styles.batteryText}>Bateria: {car.battery_level}%</Text>
          </View>
        )}

        {chargingTime && (
          <View style={styles.chargingTimeContainer}>
            <Text style={styles.chargingTimeText}>{chargingTime}</Text>
          </View>
        )}

        <FlatList
          data={stations}
          renderItem={renderStationItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

export default ChargingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  carInfoContainer: {
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  carText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  batteryText: {
    fontSize: 16,
    color: 'gray',
  },
  stationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  stationItem: {
    flex: 1,
    marginLeft: 8,
  },
  stationText: {
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  chargingTimeContainer: {
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco translúcido
    padding: 10,
    borderRadius: 8,
  },
  chargingTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});
