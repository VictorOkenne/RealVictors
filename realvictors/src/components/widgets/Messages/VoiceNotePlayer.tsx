/**
 * VoiceNotePlayer Component
 *
 * Displays and plays voice notes with waveform visualization
 *
 * Design:
 * - Play/pause button (white circle)
 * - Waveform visualization with animated bars
 * - Progress indication (filled bars in white/gold, unfilled in gray)
 * - Duration display
 */

import { Audio } from 'expo-av';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { PlayIcon, PauseIcon } from '../../icons';

interface VoiceNotePlayerProps {
  audioUri: string;
  duration: number; // Duration in seconds
  isCurrentUser: boolean;
  style?: ViewStyle;
}

export const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({
  audioUri,
  duration,
  isCurrentUser,
  style,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(duration * 1000); // Convert to ms
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Waveform bar heights (relative values 0-1) - reduced count for better fit
  const waveformData = [
    0.65, 1.0, 0.5, 1.0, 0.8, 0.55, 0.45, 0.55, 0.65, 0.55, 0.85, 0.7, 0.5, 0.45,
  ];

  // Calculate progress (0-1)
  const progress = playbackDuration > 0 ? playbackPosition / playbackDuration : 0;
  const filledBarsCount = Math.floor(progress * waveformData.length);

  // Format duration
  const formatDuration = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Load and setup audio
  useEffect(() => {
    let mounted = true;

    const setupAudio = async () => {
      try {
        // Set audio mode
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        // For mock data, we don't actually load the audio
        // In production, you would load from audioUri
        if (audioUri.startsWith('mock-')) {
          // Don't load mock audio
          return;
        }

        const { sound: audioSound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );

        if (mounted) {
          setSound(audioSound);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    setupAudio();

    return () => {
      mounted = false;
      if (sound) {
        sound.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [audioUri]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis || duration * 1000);
      setIsPlaying(status.isPlaying);

      // Auto-stop at end
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlaybackPosition(0);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!sound) {
      // Mock playback for demo
      if (!isPlaying) {
        setIsPlaying(true);
        // Simulate playback
        intervalRef.current = setInterval(() => {
          setPlaybackPosition(pos => {
            const newPos = pos + 100;
            if (newPos >= playbackDuration) {
              setIsPlaying(false);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              return 0;
            }
            return newPos;
          });
        }, 100);
      } else {
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      return;
    }

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Play/Pause Button */}
      <TouchableOpacity
        onPress={togglePlayPause}
        style={[
          styles.playButton,
          isCurrentUser ? styles.playButtonUser : styles.playButtonOther,
        ]}
        activeOpacity={0.7}
      >
        {isPlaying ? (
          <PauseIcon
            width={16}
            height={16}
            color={isCurrentUser ? COLORS.black : COLORS.white}
          />
        ) : (
          <PlayIcon
            width={16}
            height={16}
            color={isCurrentUser ? COLORS.black : COLORS.white}
          />
        )}
      </TouchableOpacity>

      {/* Waveform */}
      <View style={styles.waveformContainer}>
        {waveformData.map((height, index) => {
          const isFilled = index < filledBarsCount || (isPlaying && index === filledBarsCount);
          const barHeight = Math.max(8, height * 32); // Min 8px, max 32px

          return (
            <View
              key={index}
              style={[
                styles.waveformBar,
                { height: barHeight },
                isFilled
                  ? isCurrentUser
                    ? styles.waveformBarFilledUser
                    : styles.waveformBarFilled
                  : styles.waveformBarUnfilled,
              ]}
            />
          );
        })}
      </View>

      {/* Duration (optional) */}
      {!isPlaying && duration > 0 && (
        <Text style={[styles.duration, isCurrentUser && styles.durationUser]}>
          {formatDuration(playbackPosition || playbackDuration)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonOther: {
    backgroundColor: COLORS.gray300,
  },
  playButtonUser: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 32,
    paddingVertical: 4,
    flex: 1,
    overflow: 'hidden', // Prevent overflow
  },
  waveformBar: {
    width: 3,
    borderRadius: 4,
    flexShrink: 0, // Prevent bars from shrinking
  },
  waveformBarFilled: {
    backgroundColor: COLORS.white,
  },
  waveformBarFilledUser: {
    backgroundColor: COLORS.black,
  },
  waveformBarUnfilled: {
    backgroundColor: COLORS.gray300,
  },
  duration: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
    marginLeft: 4,
  },
  durationUser: {
    color: COLORS.black,
  },
});

export default VoiceNotePlayer;
