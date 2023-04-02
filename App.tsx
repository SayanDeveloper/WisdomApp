import { Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoCard from './components/VideoCard'
import axios from 'axios'
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import VideoPlayer from './screens/VideoPlayer';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  const [cardsData, setCardsData] = useState([])

  const videoListFetcher = async () => {
    try {
      const response = await fetch(
        'https://www.wisdomapp.in/api/v1/content/?page=1&limit=10',
      );
      const json = await response.json();
      console.log(json.results[0])
      setCardsData(json.results)
      return json.movies;
    } catch (error) {
      console.error(error);
    }  
  }

  useEffect(() => {
    videoListFetcher()
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
