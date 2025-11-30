/**
 * TeamProfileTabNavigation Component
 *
 * Bottom navigation for team profile page with 4 tabs:
 * - Squad (team members)
 * - Matches
 * - Competitions (leagues/tournaments)
 * - Stats
 *
 * Active tab shows icon + text with gold indicator
 * Inactive tabs show only icon
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { BasketballCourtIcon, FieldIcon, GroupIcon, LeaderIcon, TrophyIcon } from '../../icons';

export type TeamProfileTab = 'squad' | 'matches' | 'competitions' | 'stats';

interface TeamProfileTabNavigationProps {
  activeTab: TeamProfileTab;
  onTabChange: (tab: TeamProfileTab) => void;
  currentSport?: 'soccer' | 'basketball';
}

export const TeamProfileTabNavigation: React.FC<TeamProfileTabNavigationProps> = ({
  activeTab,
  onTabChange,
  currentSport = 'soccer',
}) => {
  // Determine which icon to use for matches tab based on current sport
  const matchesIcon = currentSport === 'basketball' ? (
    <BasketballCourtIcon color={activeTab === 'matches' ? COLORS.goldAccent : COLORS.white} width={24} height={24} />
  ) : (
    <FieldIcon color={activeTab === 'matches' ? COLORS.goldAccent : COLORS.white} width={24} height={24} />
  );

  const tabs: { key: TeamProfileTab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'squad',
      label: 'Squad',
      icon: <GroupIcon color={activeTab === 'squad' ? COLORS.goldAccent : COLORS.white} width={24} height={24} />,
    },
    {
      key: 'matches',
      label: 'Matches',
      icon: matchesIcon,
    },
    {
      key: 'competitions',
      label: 'Competitions',
      icon: <TrophyIcon color={activeTab === 'competitions' ? COLORS.goldAccent : COLORS.white} width={24} height={24} />,
    },
    {
      key: 'stats',
      label: 'Stats',
      icon: <LeaderIcon color={activeTab === 'stats' ? COLORS.goldAccent : COLORS.white} width={24} height={24} />,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              {tab.icon}
              {isActive && (
                <Text style={styles.tabLabel}>
                  {tab.label}
                </Text>
              )}
            </View>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.goldAccent,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '60%',
    height: 3,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
  },
});

export default TeamProfileTabNavigation;
