import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native'
import VideoCard from '../components/VideoCard'

const Home = ({navigation}: any) => {
  const [cardsData, setCardsData] = useState<any>([])
  const [page, setPage] = useState(1)

  const videoListFetcher = async () => {
    try {
      const response = await fetch(
        `https://www.wisdomapp.in/api/v1/content/?page=${page}&limit=10`,
      );
      const json = await response.json();
      console.log(json.results[0])
      setCardsData([...cardsData, ...json.results])
      return json.movies;
    } catch (error) {
      console.error(error);
    }  
  }

  const loadMoreCards = () => {
    setPage(page+1)
  }

  useEffect(() => {
    videoListFetcher()
  }, [page])

  return (
    <SafeAreaView style={styles.totalContainer}>
        <FlatList 
          data={cardsData}
          renderItem={({item, i}:any) => (
            <TouchableOpacity 
              activeOpacity={0.7}
              key={i}
              onPress={() => {
                navigation.navigate("VideoPlayer", {
                  logo: item.channel?.creator?.logo,
                  title: item.title,
                  video: item.video_id
                })
              }} 
              style={styles.videoCard}
            >
              <VideoCard item={item} />
            </TouchableOpacity>
          )}
          onEndReached={loadMoreCards}
          style={styles.totalContainer}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  videoCard: {
    paddingBottom: 4
  },
  totalContainer: {
    backgroundColor: '#000',
    flex: 1,
    paddingHorizontal: 8
  },
  vidList: {
    paddingHorizontal: 17
  }
})

export default Home
