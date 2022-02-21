import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Options } from '.';
import { styles } from './styles';

type ErrorComponentProps = {
  options?: Options;
  reset(): void;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ options, reset }) => {
  const defaultOptions = {
    message:
      options?.message ||
      'Parece que um erro aconteceu, volte atrás e tente novamente.',
    buttonTitle: options?.buttonTitle || 'Voltar',
    buttonColor: options?.buttonColor || 'grey',
    textButtonColor: options?.textButtonColor || 'white',
  };
  const { message, buttonTitle, buttonColor, textButtonColor } = defaultOptions;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            onPress={() => reset()}
            style={[styles.button, { backgroundColor: buttonColor }]}
          >
            <Text style={[styles.textCenter, { color: textButtonColor }]}>
              {buttonTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ErrorComponent;
