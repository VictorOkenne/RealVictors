/**
 * NotificationCategoryChip Component
 *
 * Horizontal scrollable chips for filtering notifications by category.
 * Features smooth animations, badge counts, and haptic feedback.
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';

export interface CategoryChip {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface NotificationCategoryChipProps {
  categories: CategoryChip[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const NotificationCategoryChip: React.FC<NotificationCategoryChipProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const handlePress = (categoryId: string) => {
    // Haptic feedback on selection
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectCategory(categoryId);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;

        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => handlePress(category.id)}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                category.color && isSelected && {
                  backgroundColor: category.color,
                  borderColor: category.color,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {category.label}
              </Text>
              {category.count !== undefined && category.count > 0 && (
                <View
                  style={[
                    styles.badge,
                    isSelected && styles.badgeSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      isSelected && styles.badgeTextSelected,
                    ]}
                  >
                    {category.count}
                  </Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray100,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    gap: 6,
  },
  chipSelected: {
    backgroundColor: COLORS.goldAccent,
    borderColor: COLORS.goldAccent,
  },
  chipText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray700,
  },
  chipTextSelected: {
    color: COLORS.black,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeSelected: {
    backgroundColor: COLORS.black,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray700,
  },
  badgeTextSelected: {
    color: COLORS.goldAccent,
  },
});

export default NotificationCategoryChip;
