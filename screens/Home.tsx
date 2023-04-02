import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native'
import VideoCard from '../components/VideoCard'

const Home = ({navigation}: any) => {
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

  const navigateToPlayer = (data: any) => {
    navigation.navigate('VideoPlayer', {
      logo: data.channel?.creator?.logo,
      title: data.title,
      video: data.video_id
    })
  }

  useEffect(() => {
    videoListFetcher()
  }, [])

  return (
    <SafeAreaView style={styles.totalContainer}>
      <ScrollView style={styles.vidList}>
        <Text>Up Next</Text>
        {cardsData?.map((cardData: any, index:number) => (
          <VideoCard onClick={() => navigateToPlayer(cardData)} cardData={cardData} />
        ))}
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

export default Home
