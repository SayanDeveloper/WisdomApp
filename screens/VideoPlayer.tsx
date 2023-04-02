import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import VideoCard from '../components/VideoCard';

const ScreenWidth = Dimensions.get("screen").width

const VideoPlayer = ({route, navigation}: any) => {
  const { logo, title, video } = route.params;
  console.log(video)

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
      <YoutubePlayer
        height={ScreenWidth/1.78}
        play={true}
        videoId={video}
      />
      <Text>{title}</Text>
      <ScrollView style={styles.vidList}>
        <Text>Up Next</Text>
        <VideoCard onClick={() => navigateToPlayer(cardsData[0])} cardData={cardsData[0]} />
        <VideoCard onClick={() => navigateToPlayer(cardsData[1])} cardData={cardsData[1]} />
        <VideoCard onClick={() => navigateToPlayer(cardsData[2])} cardData={cardsData[2]} />
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

export default VideoPlayer
