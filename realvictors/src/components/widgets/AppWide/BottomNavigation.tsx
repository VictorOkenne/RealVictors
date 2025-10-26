/**
 * BottomNavigation Widget
 * 
 * Bottom navigation bar with 5 tabs
 * Used across the app for main navigation
 */

import React from 'react';
import { Image, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants';

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
      icon: 'https://www.figma.com/api/mcp/asset/61afa914-28c6-46cb-b1fd-34dfdd7d9bd1',
    },
    {
      id: 'stats' as const,
      label: 'Stats',
      icon: 'https://www.figma.com/api/mcp/asset/f25adb03-b3f8-4f4f-8088-a2c9fb851fd6',
    },
    {
      id: 'post' as const,
      label: 'Post',
      icon: 'https://www.figma.com/api/mcp/asset/ec42b7c7-1e92-469a-abc3-d90b59d53c33',
    },
    {
      id: 'leaders' as const,
      label: 'Leaders',
      icon: 'https://www.figma.com/api/mcp/asset/f51d9fb9-a893-4b52-a4e9-7c8a0d4e00e6',
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: 'https://www.figma.com/api/mcp/asset/3d32ac38-a6f0-4d87-b1df-0c035f513d63',
    },
  ];

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
            <Image
              source={{ uri: tab.icon }}
              style={{
                width: 30,
                height: 30,
                tintColor: isActive ? COLORS.black : '#827F7F',
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: isActive ? 13.75 : 12.4,
                color: isActive ? COLORS.black : '#827F7F',
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

