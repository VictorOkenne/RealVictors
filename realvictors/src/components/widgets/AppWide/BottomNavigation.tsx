/**
 * BottomNavigation Widget
 *
 * Bottom navigation bar with 5 tabs
 * Used across the app for main navigation
 */

import React from 'react';
import { Image, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants';
import { HomeIcon, LeaderIcon, StatsIcon } from '../../icons';
import { PlayerAvatar } from '../Player/PlayerAvatar';


interface BottomNavigationProps {
  activeTab: 'home' | 'stats' | 'post' | 'leaders' | 'profile';
  onTabChange: (tab: 'home' | 'stats' | 'post' | 'leaders' | 'profile') => void;
  style?: ViewStyle;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  style,
}) => {
  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      type: 'icon' as const,
    },
    {
      id: 'stats' as const,
      label: 'Stats',
      type: 'icon' as const,
    },
    {
      id: 'post' as const,
      label: 'Post',
      type: 'image' as const,
      icon: 'https://www.figma.com/api/mcp/asset/ec42b7c7-1e92-469a-abc3-d90b59d53c33',
    },
    {
      id: 'leaders' as const,
      label: 'Leaders',
      type: 'icon' as const,
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      type: 'avatar' as const,
    },
  ];

  const renderIcon = (tab: typeof tabs[0], isActive: boolean) => {
    const iconColor = COLORS.black;
    const iconSize = 30;

    switch (tab.id) {
      case 'home':
        return <HomeIcon width={iconSize} height={iconSize} color={iconColor} />;
      case 'stats':
        return <StatsIcon width={iconSize} height={iconSize} color={iconColor} />;
      case 'leaders':
        return <LeaderIcon width={iconSize} height={iconSize} color={iconColor} />;
      case 'profile':
        return (
          <PlayerAvatar
            profileImage={require('../../../assets/MockData/MatchPage/cole-palmer.png')}
            size={iconSize}
            circularBackground={true}
            backgroundColor={COLORS.black}
          />
        );
      case 'post':
        return (
          <Image
            source={{ uri: tab.icon }}
            style={{
              width: iconSize,
              height: iconSize,
              tintColor: COLORS.black,
            }}
            resizeMode="contain"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 35,
          borderTopWidth: 0,
        },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              paddingBottom: 4,
              borderBottomWidth: isActive ? 2.5 : 0,
              borderBottomColor: isActive ? COLORS.gold : 'transparent',
            }}
            activeOpacity={0.7}
          >
            {renderIcon(tab, isActive)}
            <Text
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: isActive ? 13.75 : 12.4,
                color: COLORS.black,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

