/**
 * NotificationHeader Widget
 *
 * Header component for the notifications page with:
 * - Back button
 * - "Notifications" title
 * - Mark all as read button
 * - Filter button
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FilterIcon } from '../../icons';

interface NotificationHeaderProps {
  onBackPress: () => void;
  onMarkAllRead: () => void;
  onFilterPress: () => void;
  unreadCount?: number;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  onBackPress,
  onMarkAllRead,
  onFilterPress,
  unreadCount = 0,
}) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Notifications</Text>

      {/* Right Actions */}
      <View style={styles.rightActions}>
        {/* Mark All Read Button - Only show if there are unread notifications */}
        {unreadCount > 0 && (
          <TouchableOpacity onPress={onMarkAllRead} style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}

        {/* Filter Button */}
        <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
          <FilterIcon width={20} height={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  markAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  markAllText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.goldAccent,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationHeader;
