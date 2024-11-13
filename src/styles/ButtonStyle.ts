// src/styles/ButtonStyle.ts
import { StyleSheet } from 'react-native';

const ButtonStyle = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: '#5add75', // Verde suave
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Branco menos transparente
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000', // Texto preto
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ButtonStyle;
