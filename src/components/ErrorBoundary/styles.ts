import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: height - 50,
    justifyContent: 'center',
  },
  textView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  img: {
    height: 180,
    width: 180,
  },
  textCenter: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
