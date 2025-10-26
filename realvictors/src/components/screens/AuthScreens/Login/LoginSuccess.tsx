import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * Checkmark Icon
 */
const CheckmarkIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M5 12l5 5L20 7"/>
  </Svg>
);

/**
 * LoginSuccess - Success screen after login
 * 
 * Displays success message before redirecting to app
 */
export const LoginSuccess = () => {
  return (
    <View style={styles.successContent}>
      <View style={styles.successCheckmark}>
        <CheckmarkIcon />
      </View>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 10 }]}>
        Login successful. Redirecting...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -100,
  },
  successCheckmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFC245',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
    lineHeight: 36,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
    lineHeight: 23,
  },
});

export default LoginSuccess;

