import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import VideoCard from '../components/VideoCard';

const ScreenWidth = Dimensions.get("screen").width

const VideoPlayer = ({route, navigation}: any) => {
  const { logo, title, video } = route.params;
  console.log(video)

  const [cardsData, setCardsData] = useState<any>([])
  const [page, setPage] = useState(1)

  const videoListFetcher = async () => {
    try {
      const response = await fetch(
        'https://www.wisdomapp.in/api/v1/content/?page=1&limit=10',
      );
      const json = await response.json();
      setCardsData([...cardsData, ...json.results])
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
      <Text style={styles.upNext}>Up Next</Text>
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
  totalContainer: {
    backgroundColor: '#000',
    flex: 1,
    paddingHorizontal: 8
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
  upNext: {
    color: 'white',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 17,
    paddingLeft: 10
  },
  videoCard: {
    paddingBottom: 4
  },
})

export default VideoPlayer
