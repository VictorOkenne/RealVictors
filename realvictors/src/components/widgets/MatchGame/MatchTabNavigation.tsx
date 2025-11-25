/**
 * MatchTabNavigation Widget
 *
 * Tab navigation for match details sections
 * Shows: Lineup, Overview, Stats, Recap, Team Stats
 */

import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

export type MatchTab = 'lineup' | 'overview' | 'timeline' | 'stats' | 'recap' | 'preview' | 'teamForm' | 'squadComparison' | 'history';

interface MatchTabNavigationProps {
  activeTab: MatchTab;
  onTabChange: (tab: MatchTab) => void;
  style?: ViewStyle;
  tabs?: { id: MatchTab; label: string }[]; // Optional custom tabs array
}

export const MatchTabNavigation: React.FC<MatchTabNavigationProps> = ({
  activeTab,
  onTabChange,
  style,
  tabs: customTabs,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: string]: View | null }>({});

  // Default tabs for previous/finished games
  const defaultTabs: { id: MatchTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'lineup', label: 'Lineup' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'recap', label: 'Recap' },
    { id: 'stats', label: 'Stats' },
  ];

  // Use custom tabs if provided, otherwise use default
  const tabs = customTabs || defaultTabs;

  const handleTabPress = (tabId: MatchTab) => {
    onTabChange(tabId);

    // Scroll to make the selected tab visible
    setTimeout(() => {
      const tabRef = tabRefs.current[tabId];
      if (tabRef && scrollViewRef.current) {
        tabRef.measureLayout(
          scrollViewRef.current as any,
          (x) => {
            // Calculate scroll position to center the tab
            scrollViewRef.current?.scrollTo({
              x: x - 20, // Offset by padding
              y: 0,
              animated: true,
            });
          },
          () => {
            console.log('Failed to measure tab');
          }
        );
      }
    }, 100);
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => (
          <View
            key={tab.id}
            ref={(ref) => (tabRefs.current[tab.id] = ref)}
          >
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.id)}
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
          </View>
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

