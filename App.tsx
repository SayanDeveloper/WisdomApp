import { Button, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoCard from './components/VideoCard'
import axios from 'axios'
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import VideoPlayer from './screens/VideoPlayer';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Wisdom'
          }}
        />
        <Stack.Screen 
          name="VideoPlayer" 
          component={VideoPlayer}
          options={{
            title: '',
            headerRight: () => (
              <TouchableOpacity activeOpacity={0.8} style={styles.shareButton}>
                <Image source={require('./assets/whatsapp.png')} style={styles.whatsappLogo} />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  shareButton: {
    borderColor: '#444',
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  shareText: {
    color: 'white',
    fontSize: 16
  },
  whatsappLogo: {
    width: 25,
    height: 25
  }
})

export default App
