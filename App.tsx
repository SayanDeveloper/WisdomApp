import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoCard from './components/VideoCard'
import axios from 'axios'

const screenHeight = Dimensions.get("screen").height

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
    <SafeAreaView style={styles.totalContainer}>
      <ScrollView style={styles.vidList}>
        <Text>Up Next</Text>
        <VideoCard cardData={cardsData[0]} />
        <VideoCard cardData={cardsData[1]} />
        <VideoCard cardData={cardsData[2]} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  totalContainer: {
    backgroundColor: '#000',
    flex: 1
  },
  vidList: {
    paddingHorizontal: 17
  }
})

export default App
