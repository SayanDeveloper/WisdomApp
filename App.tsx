import { Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
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
              <Button
                onPress={() => console.log('This is a button!')}
                title="Share"
                color="#000"
              />
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
