/**
 * ProfileTabNavigation Component
 *
 * Bottom navigation for profile page with 4 tabs:
 * - Highlights (default active)
 * - Profile (bio/about)
 * - Matches
 * - Stats
 *
 * Active tab shows icon + text with gold indicator
 * Inactive tabs show only icon
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { BasketballCourtIcon, FieldIcon, GridIcon, LeaderIcon, ProfileIcon } from '../../icons';

export type ProfileTab = 'highlights' | 'profile' | 'matches' | 'stats';

interface ProfileTabNavigationProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  currentSport?: 'soccer' | 'basketball';
}


export const ProfileTabNavigation: React.FC<ProfileTabNavigationProps> = ({
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

  const tabs: { key: ProfileTab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'highlights',
      label: 'Highlights',
      icon: <GridIcon color={activeTab === 'highlights' ? COLORS.goldAccent : COLORS.white} width={20} height={24} />,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: <ProfileIcon color={activeTab === 'profile' ? COLORS.goldAccent : COLORS.white} width={20} height={24} />,
    },
    {
      key: 'matches',
      label: 'Matches',
      icon: matchesIcon,
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

export default ProfileTabNavigation;
