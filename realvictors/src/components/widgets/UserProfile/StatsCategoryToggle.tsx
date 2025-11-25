/**
 * StatsCategoryToggle Component
 *
 * Horizontal toggle for switching between Career High, Averages, Totals, and Wins stats
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

export type StatsCategory = 'careerHigh' | 'averages' | 'totals' | 'wins';

interface StatsCategoryToggleProps {
  activeCategory: StatsCategory;
  onCategoryChange: (category: StatsCategory) => void;
}

export const StatsCategoryToggle: React.FC<StatsCategoryToggleProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories: { key: StatsCategory; label: string }[] = [
    { key: 'careerHigh', label: 'Career High' },
    { key: 'averages', label: 'Averages' },
    { key: 'totals', label: 'Totals' },
    { key: 'wins', label: 'Wins' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              activeCategory === category.key && styles.categoryButtonActive,
            ]}
            onPress={() => onCategoryChange(category.key)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === category.key && styles.categoryButtonTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  scrollContent: {
    gap: 10,
    paddingHorizontal: 0,
  },
  categoryButton: {
    backgroundColor: COLORS.gray150,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 200,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.gray850,
  },
  categoryButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 18,
    color: COLORS.black,
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
});

export default StatsCategoryToggle;
