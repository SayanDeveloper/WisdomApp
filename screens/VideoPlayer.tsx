import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
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
      <View style={styles.cardFooter}>
        <Image 
          source={{uri: logo || "https://widsom-media.s3.ap-south-1.amazonaws.com/images/creators-images/buddha_inspired.jpeg"}} 
          style={styles.channelLogo}
        />
        <Text numberOfLines={2} style={styles.videoTitle}>
          {title}
        </Text>
      </View>
      <ScrollView style={styles.vidList}>
        <Text>Up Next</Text>
        <VideoCard item={cardsData[0]} />
        <VideoCard item={cardsData[1]} />
        <VideoCard item={cardsData[2]} />
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
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  channelLogo: {
    borderRadius: 45,
    height: 45,
    width: 45
  },
  videoTitle: {
    color: 'white',
    lineHeight: 25,
    fontSize: 18,
    width: ScreenWidth - 90
  },
})

export default VideoPlayer
