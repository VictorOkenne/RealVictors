import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../src/utils/theme';

export default function MessagesScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Messages</Text>
      <Text style={[styles.subtitle, { color: colors.secondary }]}>
        Coming soon! Chat with teammates and other players here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

