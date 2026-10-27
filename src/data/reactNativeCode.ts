export const REACT_NATIVE_FILES = {
  "App.tsx": `import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ShlokasScreen from './screens/ShlokasScreen';
import PlayerScreen from './screens/PlayerScreen';
import JapaMalaScreen from './screens/JapaMalaScreen';
import GuidanceScreen from './screens/GuidanceScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0b0f17" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#f59e0b',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarStyle: {
            backgroundColor: '#090d16',
            borderTopColor: '#1e293b',
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#f59e0b',
          tabBarInactiveTintColor: '#64748b',
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: any = 'book-outline';
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Shlokas') iconName = focused ? 'book' : 'book-outline';
            else if (route.name === 'Player') iconName = focused ? 'musical-notes' : 'musical-notes-outline';
            else if (route.name === 'Japa Mala') iconName = focused ? 'disc' : 'disc-outline';
            else if (route.name === 'Guidance') iconName = focused ? 'compass' : 'compass-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Geeta Home' }} />
        <Tab.Screen name="Shlokas" component={ShlokasScreen} options={{ title: 'Shlokas' }} />
        <Tab.Screen name="Player" component={PlayerScreen} options={{ title: 'Audio Chanting' }} />
        <Tab.Screen name="Japa Mala" component={JapaMalaScreen} options={{ title: '108 Mala' }} />
        <Tab.Screen name="Guidance" component={GuidanceScreen} options={{ title: 'Life Advice' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}`,

  "screens/PlayerScreen.tsx": `import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Slider } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function PlayerScreen({ route, navigation }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const shloka = {
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana...",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."
  };

  const handlePlayAudio = () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      Speech.speak(shloka.sanskrit, {
        language: 'hi-IN',
        pitch: 0.95,
        rate: 0.85,
        onDone: () => setIsPlaying(false),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Chapter {shloka.chapter} · Verse {shloka.verse}</Text>
      <View style={styles.card}>
        <Text style={styles.sanskritText}>{shloka.sanskrit}</Text>
        <Text style={styles.translitText}>{shloka.transliteration}</Text>
      </View>
      <Text style={styles.translationText}>{shloka.translation}</Text>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayAudio}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f17', alignItems: 'center', justifyContent: 'center', padding: 24 },
  badge: { color: '#f59e0b', fontSize: 13, marginBottom: 16, fontWeight: '600' },
  card: { backgroundColor: '#131d2e', padding: 24, borderRadius: 20, width: '100%', borderWidth: 1, borderColor: '#1e293b' },
  sanskritText: { color: '#fbbf24', fontSize: 22, textAlign: 'center', lineHeight: 36, fontWeight: '600' },
  translitText: { color: '#94a3b8', fontSize: 14, textAlign: 'center', marginTop: 12, fontStyle: 'italic' },
  translationText: { color: '#cbd5e1', fontSize: 15, textAlign: 'center', marginVertical: 20, lineHeight: 24 },
  controlsRow: { marginTop: 20 },
  playButton: { backgroundColor: '#f59e0b', width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' }
});`,

  "package.json": `{
  "name": "bhagavad-gita-audio-app",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/native": "^6.1.9",
    "expo": "~51.0.0",
    "expo-av": "~14.0.5",
    "expo-speech": "~12.0.2",
    "expo-status-bar": "~1.12.1",
    "react": "18.2.0",
    "react-native": "0.74.1"
  }
}`
};
