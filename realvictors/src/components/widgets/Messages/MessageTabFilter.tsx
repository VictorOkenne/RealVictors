/**
 * MessageTabFilter Component
 *
 * Tab navigation for filtering messages
 * Pinned | All Messages | Requests | Unread | Following | Flagged
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { PinIcon, MessageIcon, GroupIcon, BookmarkIcon } from '../../icons';

export type MessageTab = 'pinned' | 'all' | 'requests' | 'unread' | 'following' | 'flagged';

interface TabOption {
  key: MessageTab;
  label: string;
  icon?: React.ReactNode;
}

interface MessageTabFilterProps {
  tabs: TabOption[];
  activeTab: MessageTab;
  onTabChange: (tab: MessageTab) => void;
  style?: ViewStyle;
}

export const MessageTabFilter: React.FC<MessageTabFilterProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => {
  const getIcon = (tabKey: MessageTab, isActive: boolean) => {
    const iconColor = isActive ? COLORS.white : COLORS.gray600;
    const iconSize = 14;

    switch (tabKey) {
      case 'pinned':
        return <PinIcon width={iconSize} height={iconSize} color={iconColor} />;
      case 'all':
        return <MessageIcon width={iconSize} height={iconSize} color={iconColor} />;
      case 'requests':
        return <GroupIcon width={iconSize} height={iconSize} color={iconColor} />;
      case 'flagged':
        return <BookmarkIcon width={iconSize} height={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const icon = getIcon(tab.key, isActive);

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              style={[styles.tab, isActive && styles.tabActive]}
              activeOpacity={0.7}
            >
              {icon && <View style={styles.iconContainer}>{icon}</View>}
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    gap: 6,
  },
  tabActive: {
    backgroundColor: COLORS.black,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
  },
  tabTextActive: {
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
});

export default MessageTabFilter;
