import React, { useState } from 'react';
import { Image, StyleSheet, Platform, Button, View, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {

  const [data, setData] = useState<string | null>(null); // State to store fetched data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [dataGetUser, setDataGetUser] = useState<string | null>(null); // State to store fetched data
  const [loadingGetUser, setLoadingGetUser] = useState(false); // State to manage loading state
  
  const fetchData = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      // 物理デバイスから（ローカルPC内の）dockerコンテナへのアドレスは？？
      // PCでifconfigで表示されたeen0のinetアドレス。（PC ゲートウェイ 192.168.0.1）
      // スマホのゲートウェイアドレス（スマホゲートウェイ 192.168.0.1）
      // 同じネットワークにないとダメ
      // const response = await fetch('http://localhost:32011/api/hello'); // Replace with your backend URL
      const response = await fetch('http://192.168.0.154:32011/api/hello'); // Replace with your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      console.log('Fetched data:', result);
      setData(result.message); // Assuming the backend returns a "message" field
    } catch (error) {
      console.error('Error fetching data:', error);
      setData('Error fetching data');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  const fetchDataGetUser = async () => {
    setLoadingGetUser(true); // Set loading to true while fetching

    try {

      const token = await AsyncStorage.getItem('authToken');
      if (token) {
          console.log('Retrieved token:', token);
      } else {
          console.log('No token found');
      }

      // 物理デバイスから（ローカルPC内の）dockerコンテナへのアドレスは？？
      // PCでifconfigで表示されたeen0のinetアドレス。（PC ゲートウェイ 192.168.0.1）
      // スマホのゲートウェイアドレス（スマホゲートウェイ 192.168.0.1）
      // 同じネットワークにないとダメ
      // const response = await fetch('http://localhost:32011/api/hello'); // Replace with your backend URL
      const response = await fetch('http://192.168.0.154:32011/api/get-user',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      // Replace with your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      console.log('Fetched data:', result);
      setDataGetUser(result.message); // Assuming the backend returns a "message" field
    } catch (error) {
      console.error('Error fetching data:', error);
      setDataGetUser('Error fetching data');
    } finally {
      setLoadingGetUser(false); // Set loading to false after fetching
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Button title="Fetch Data " onPress={fetchData} />
        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        {data && (
          <ThemedText type="default">
            {data}
          </ThemedText>
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Button title="Fetch Data get-user" onPress={fetchDataGetUser} />
        {loadingGetUser && <ActivityIndicator size="small" color="#0000ff" />}
        {dataGetUser && (
          <ThemedText type="default">
            {dataGetUser}
          </ThemedText>
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
