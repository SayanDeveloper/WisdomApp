import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'

const ScreenWidth = Dimensions.get("screen").width

interface VideoCardProps {
  item: any,
  navigation?: any
}

const VideoCard = ({item, navigation} : VideoCardProps) => {

  return (
    <View style={styles.videoCard}>
      <Image 
        source={{uri: item?.channel?.logo || "https://widsom-media.s3.ap-south-1.amazonaws.com/images/creators-images/buddha_inspired.jpeg"}} 
        style={styles.thumbnail}
      />
      <View style={styles.cardFooter}>
        <Image 
          source={{uri: item?.channel?.creator?.logo || "https://widsom-media.s3.ap-south-1.amazonaws.com/images/creators-images/buddha_inspired.jpeg"}} 
          style={styles.channelLogo}
        />
        <View>
          <Text numberOfLines={2} style={styles.videoTitle}>
            {item?.title}
          </Text>
          <Text style={styles.channelName}>
            {item?.channel?.channel_name}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  videoCard: {
    marginBottom: 32,
    paddingBottom: 4
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1.78
  },
  cardFooter: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 15
  },
  channelLogo: {
    borderRadius: 45,
    height: 45,
    width: 45
  },
  videoTitle: {
    color: 'white',
    lineHeight: 25,
    width: ScreenWidth - 90
  },
  channelName: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2
  }
})

export default VideoCard