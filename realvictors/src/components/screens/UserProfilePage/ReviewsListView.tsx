/**
 * ReviewsListView Component
 *
 * Displays all player reviews in a scrollable modal
 * Shows individual reviews with skill ratings, comments, and reviewer info
 */

import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FilterIcon } from '../../icons';
import { FilterModal, type FilterSection, type FilterState } from '../../widgets';
import { ReviewCard } from '../../widgets/UserProfile';
import type { PlayerReview } from '../../widgets/UserProfile';

interface ReviewsListViewProps {
  reviews: PlayerReview[];
  playerName: string;
  sportType?: 'soccer' | 'basketball';
  onBackPress?: () => void;
}

// Back arrow icon
const BackArrowIcon: React.FC = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>←</Text>
  </View>
);

export const ReviewsListView: React.FC<ReviewsListViewProps> = ({
  reviews,
  playerName,
  sportType = 'soccer',
  onBackPress,
}) => {
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterState>({
    sortBy: 'recent',
    ratingRanges: [],
    reviewerType: [],
  });

  // Filter sections configuration
  const filterSections: FilterSection[] = [
    {
      title: 'Sort By',
      key: 'sortBy',
      options: [
        { label: 'Most Recent', value: 'recent' },
        { label: 'Oldest First', value: 'oldest' },
        { label: 'Highest Rating', value: 'highest' },
        { label: 'Lowest Rating', value: 'lowest' },
      ],
    },
    {
      title: 'Rating Range',
      key: 'ratingRanges',
      multiSelect: true,
      options: [
        { label: '90-100 (Elite)', value: '90-100' },
        { label: '80-89 (Great)', value: '80-89' },
        { label: '70-79 (Good)', value: '70-79' },
        { label: '60-69 (Average)', value: '60-69' },
        { label: 'Below 60 (Needs Work)', value: 'below-60' },
      ],
    },
    {
      title: 'Reviewer Type',
      key: 'reviewerType',
      multiSelect: true,
      options: [
        { label: 'Verified Reviewers', value: 'verified' },
        { label: 'Unverified Reviewers', value: 'unverified' },
      ],
    },
  ];

  // Apply filters and sorting
  const filteredReviews = React.useMemo(() => {
    let filtered = [...reviews];

    // Filter by rating ranges
    const ratingRanges = filters.ratingRanges as string[] | undefined;
    if (ratingRanges && ratingRanges.length > 0) {
      filtered = filtered.filter((r) => {
        return ratingRanges.some((range) => {
          switch (range) {
            case '90-100':
              return r.overallRating >= 90 && r.overallRating <= 100;
            case '80-89':
              return r.overallRating >= 80 && r.overallRating < 90;
            case '70-79':
              return r.overallRating >= 70 && r.overallRating < 80;
            case '60-69':
              return r.overallRating >= 60 && r.overallRating < 70;
            case 'below-60':
              return r.overallRating < 60;
            default:
              return true;
          }
        });
      });
    }

    // Filter by reviewer type (verified/unverified)
    const reviewerTypes = filters.reviewerType as string[] | undefined;
    if (reviewerTypes && reviewerTypes.length > 0) {
      filtered = filtered.filter((r) => {
        if (reviewerTypes.includes('verified') && reviewerTypes.includes('unverified')) {
          return true; // Show all if both are selected
        }
        if (reviewerTypes.includes('verified')) {
          return r.isVerified === true;
        }
        if (reviewerTypes.includes('unverified')) {
          return !r.isVerified;
        }
        return true;
      });
    }

    // Sort reviews
    switch (filters.sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'highest':
        filtered.sort((a, b) => b.overallRating - a.overallRating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.overallRating - b.overallRating);
        break;
    }

    return filtered;
  }, [reviews, filters]);

  // Calculate average ratings from filtered reviews
  const averageOverall = filteredReviews.length > 0
    ? Math.round(filteredReviews.reduce((sum, r) => sum + r.overallRating, 0) / filteredReviews.length)
    : 0;

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: 'recent',
      ratingRanges: [],
      reviewerType: [],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

      {/* Header */}
      <SafeAreaView style={styles.safeAreaWrapper} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <BackArrowIcon />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Player Reviews</Text>
            <Text style={styles.headerSubtitle}>{playerName}</Text>
            <Text style={styles.headerStats}>
              {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'} • {averageOverall} Avg Rating
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={styles.filterButton}
          >
            <FilterIcon width={20} height={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Reviews List */}
      <FlatList
        data={filteredReviews}
        renderItem={({ item }) => <ReviewCard review={item} sportType={sportType} />}
        keyExtractor={(item) => item.reviewId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No reviews found</Text>
            <Text style={styles.emptySubtext}>
              {(filters.ratingRanges as string[])?.length > 0 ||
               (filters.reviewerType as string[])?.length > 0 ||
               filters.sortBy !== 'recent'
                ? 'Try adjusting your filters'
                : 'Be the first to review this player!'}
            </Text>
          </View>
        }
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        sections={filterSections}
        selectedFilters={filters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  safeAreaWrapper: {
    backgroundColor: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray800,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
  },
  headerSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.gray300,
  },
  headerStats: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 12,
    color: COLORS.gray400,
  },
  headerPlaceholder: {
    width: 40,
  },
  filterButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    color: COLORS.white,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.gray600,
  },
  emptySubtext: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: COLORS.gray500,
  },
});

export default ReviewsListView;
