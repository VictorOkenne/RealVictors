/**
 * HomeHeader Widget
 * 
 * Header for the home page with logo, search, and notification icons
 */

import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants';
import { MessageIcon, NotificationIcon, RealVictorsLogo, SearchIcon } from '../../icons';
import { NotificationBadge } from './NotificationBadge';

interface HomeHeaderProps {
  notificationCount?: number;
  messageCount?: number;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onMessagePress?: () => void;
  style?: ViewStyle;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  notificationCount = 0,
  messageCount = 0,
  onSearchPress,
  onNotificationPress,
  onMessagePress,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 16,
          paddingTop: 10,
          backgroundColor: COLORS.black,
        },
        style,
      ]}
    >
      {/* Logo */}
      <RealVictorsLogo width={150} height={20} color={COLORS.white} />

      {/* Icons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        {/* Search Icon */}
        <TouchableOpacity onPress={onSearchPress} activeOpacity={0.7}>
          <SearchIcon width={26} height={26} color={COLORS.white} />
        </TouchableOpacity>

        {/* Message Icon */}
        <TouchableOpacity onPress={onMessagePress} activeOpacity={0.7}>
          <View style={{ position: 'relative' }}>
            <MessageIcon width={26} height={26} color={COLORS.white} />
            <NotificationBadge count={messageCount} />
          </View>
        </TouchableOpacity>

        {/* Notification Icon */}
        <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7}>
          <View style={{ position: 'relative' }}>
            <NotificationIcon width={26} height={26} color={COLORS.white} />
            <NotificationBadge count={notificationCount} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

