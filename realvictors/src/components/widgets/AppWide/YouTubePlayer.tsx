/**
 * YouTubePlayer Component
 *
 * Displays YouTube videos using react-native-youtube-iframe
 * Shows thumbnail initially, plays video inline when clicked
 */

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { COLORS } from '../../../constants';

interface YouTubePlayerProps {
  videoUrl: string;
  height?: number;
}

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  height,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return null; // Invalid URL, don't render anything
  }

  // YouTube thumbnail URL (maxresdefault for highest quality)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Show thumbnail when not playing
  if (!isPlaying) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.aspectRatioContainer}
          onPress={() => setIsPlaying(true)}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          {/* Play button overlay */}
          <View style={styles.playButtonContainer}>
            <View style={styles.playButton}>
              <View style={styles.playIcon} />
            </View>
          </View>
          {/* Video label */}
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Match Highlights</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Show YouTube player when playing
  return (
    <View style={styles.container}>
      <View style={styles.aspectRatioContainer}>
        <YoutubePlayer
          height={height || 300}
          play={isPlaying}
          videoId={videoId}
          onChangeState={(state) => {
            if (state === 'ended' || state === 'paused') {
              // Optionally handle video end or pause
            }
          }}
          webViewProps={{
            androidLayerType: 'hardware',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.black,
    borderRadius: 12,
    overflow: 'hidden',
  },
  aspectRatioContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // Standard YouTube 16:9 aspect ratio
    position: 'relative',
    backgroundColor: COLORS.black,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playIcon: {
    width: 0,
    height: 0,
    marginLeft: 5,
    borderLeftWidth: 20,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: COLORS.black,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  labelText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
