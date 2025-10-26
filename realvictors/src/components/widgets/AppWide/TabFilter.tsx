/**
 * TabFilter Widget
 * 
 * Displays a horizontal scrollable list of tab filters
 * Used in the Recent Highlights section
 */

import React from 'react';
import { ScrollView, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';

interface TabFilterProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  style?: ViewStyle;
}

export const TabFilter: React.FC<TabFilterProps> = ({ tabs, activeTab, onTabChange, style }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 10,
      }}
      style={style}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 11,
              borderRadius: BORDER_RADIUS.full,
              backgroundColor: isActive ? COLORS.black : 'transparent',
              borderWidth: 1,
              borderColor: isActive ? COLORS.black : COLORS.gray300,
            }}
            activeOpacity={0.7}
          >
            <Text
              style={{
                fontFamily: TYPOGRAPHY.fontFamily.medium,
                fontSize: TYPOGRAPHY.fontSize.base,
                color: isActive ? COLORS.white : COLORS.black,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

