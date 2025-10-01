import React from 'react';
import { View, Text, Image, ViewStyle, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  style,
}) => {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
    '2xl': 96,
  };

  const avatarSize = sizeMap[size];
  
  const getInitials = (name?: string): string => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarStyle = (): ViewStyle => ({
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...style,
  });

  const getInitialsStyle = (): TextStyle => ({
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: avatarSize * 0.35,
    color: COLORS.black,
    textAlign: 'center',
  });

  if (src) {
    return (
      <View style={getAvatarStyle()}>
        <Image
          source={{ uri: src }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View style={getAvatarStyle()}>
      <Text style={getInitialsStyle()}>
        {getInitials(name)}
      </Text>
    </View>
  );
};


