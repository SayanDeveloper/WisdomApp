import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface VideoCardProps {
  cardData: any
}

const VideoCard = ({cardData} : VideoCardProps) => {

  return (
    <View style={styles.videoCard}>
      <Image 
        source={{uri: cardData?.channel?.logo || "https://widsom-media.s3.ap-south-1.amazonaws.com/images/creators-images/buddha_inspired.jpeg"}} 
        style={styles.thumbnail}
      />
      <View style={styles.cardFooter}>
        <Image 
          source={{uri: cardData?.channel?.creator?.logo || "https://widsom-media.s3.ap-south-1.amazonaws.com/images/creators-images/buddha_inspired.jpeg"}} 
          style={styles.channelLogo}
        />
        <View>
          <Text numberOfLines={2} style={styles.videoTitle}>
            {cardData?.title}
          </Text>
          <Text style={styles.channelName}>
            {cardData?.channel?.channel_name}
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
    lineHeight: 25
  },
  channelName: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2
  }
})

export default VideoCard