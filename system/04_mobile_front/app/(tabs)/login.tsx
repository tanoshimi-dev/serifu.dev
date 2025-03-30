import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, Image, Platform  } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRouter } from 'expo-router';

export default function TabThreeScreen() {

  const router = useRouter();

  const [email, setEmail] = useState('mokon@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
      setLoading(true);
      setError(null);

      try {
          const response = await fetch('http://192.168.0.154:32011/api/sp-login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Login failed');
          }

          const result = await response.json();
          console.log('Login successful:', result);
          // navigation.navigate('index', []);

          // Save the token to AsyncStorage
          await AsyncStorage.setItem('authToken', result.token); // Assuming the token is in `result.token`
          router.push('/'); 

      } catch (err: any) {
          console.error('Login error:', err.message);
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Login</ThemedText>
      </ThemedView>
      <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <Button title="Login" onPress={handleLogin} />
        )}      
    </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
  },
  input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
  },
  error: {
      color: 'red',
      marginBottom: 12,
      textAlign: 'center',
  },

});
