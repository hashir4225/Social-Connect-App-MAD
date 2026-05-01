import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function SignupScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Button title="Sign Up" onPress={() => navigation.replace('Main')} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 }
});
