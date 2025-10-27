/**
 * MatchTabNavigation Widget
 * 
 * Tab navigation for match details sections
 * Shows: Lineups, Overview, Stats, Recap, Team Stats
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

export type MatchTab = 'lineups' | 'overview' | 'stats' | 'recap' | 'teamStats';

interface MatchTabNavigationProps {
  activeTab: MatchTab;
  onTabChange: (tab: MatchTab) => void;
  style?: ViewStyle;
}

export const MatchTabNavigation: React.FC<MatchTabNavigationProps> = ({
  activeTab,
  onTabChange,
  style,
}) => {
  const tabs: { id: MatchTab; label: string }[] = [
    { id: 'lineups', label: 'Lineups' },
    { id: 'overview', label: 'Overview' },
    { id: 'stats', label: 'Stats' },
    { id: 'recap', label: 'Recap' },
    { id: 'teamStats', label: 'Team Stats' },
  ];

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => onTabChange(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.id && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 35,
    paddingVertical: 15,
  },
  tabButton: {
    position: 'relative',
  },
  tabText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: -0.5,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -7,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#F8C300",
    borderRadius: 2,
  },
});

