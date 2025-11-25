/**
 * App-Wide Mock Data
 *
 * Centralized mock data that is used across multiple screens in the app.
 * This file contains user data that should be consistent everywhere.
 *
 * Benefits:
 * - Single source of truth for user data
 * - Easy to maintain and update
 * - Sport-specific data separated by type
 * - Reusable across HomePage, ProfilePage, etc.
 */

import { ImageSourcePropType } from 'react-native';
import { SportType } from '../../contexts/SportContext';

/**
 * Current User's App-Wide Profile Data
 * Contains both soccer and basketball profiles
 *
 * Achievement Badge Order:
 * [0] Championships Won - Total championships won in this sport
 * [1] Upcoming Matches - Number of upcoming scheduled matches/games
 * [2] Overall Rating - Overall skill rating (0-100)
 */

interface SeasonStats {
  label: string;
  value: string;
}

interface TotalStats {
  label: string;
  value: string;
}

interface SportData {
  // Season averages (for current season)
  seasonStats: SeasonStats[];
  // Total/career stats (all-time)
  totalStats: TotalStats[];
  // Achievements: [Championships Won, Upcoming Matches, Overall Rating]
  achievements: number[];
  // Profile image for this sport
  profileImage?: ImageSourcePropType;
  hasUploadedProfileImage: boolean;
}

interface AppUserData {
  soccer: SportData;
  basketball: SportData;
  defaultSport: SportType; // User's preferred sport
}

/**
 * Current logged-in user's data
 * Used across HomePage, ProfilePage, etc.
 */
export const currentUserData: AppUserData = {
  // Soccer profile data
  soccer: {
    seasonStats: [
      { label: 'Goals', value: '18' },
      { label: 'Assists', value: '12' },
      { label: 'Wins', value: '24' },
      { label: 'Losses', value: '11' },
    ],
    totalStats: [
      { label: 'Goals', value: '203' },
      { label: 'Assists', value: '127' },
      { label: 'Wins', value: '156' },
      { label: 'Losses', value: '98' },
    ],
    achievements: [
      3,  // Championships won in soccer
      5,  // Upcoming soccer matches/games
      79, // Overall rating in soccer (0-100)
    ],
    hasUploadedProfileImage: true,
    profileImage: require('../MockData/MatchPage/cole-palmer.png'),
  },

  // Basketball profile data
  basketball: {
    seasonStats: [
      { label: 'Points', value: '18.5' },
      { label: 'Assists', value: '6.5' },
      { label: 'Wins', value: '28' },
      { label: 'Losses', value: '7' },
    ],
    totalStats: [
      { label: 'Points', value: '2,478' },
      { label: 'Assists', value: '871' },
      { label: 'Wins', value: '89' },
      { label: 'Losses', value: '45' },
    ],
    achievements: [
      2,  // Championships won in basketball
      3,  // Upcoming basketball matches/games
      82, // Overall rating in basketball (0-100)
    ],
    hasUploadedProfileImage: true,
    profileImage: require('../MockData/MatchPage/cole-palmer.png'), // Replace with basketball photo in real app
  },

  // User's default/preferred sport
  defaultSport: 'soccer',
};

/**
 * Helper function to get sport-specific data
 */
export const getSportData = (sport: SportType): SportData => {
  return currentUserData[sport];
};

/**
 * Helper function to get season stats for a sport
 */
export const getSeasonStats = (sport: SportType): SeasonStats[] => {
  return currentUserData[sport].seasonStats;
};

/**
 * Helper function to get total stats for a sport
 */
export const getTotalStats = (sport: SportType): TotalStats[] => {
  return currentUserData[sport].totalStats;
};

/**
 * Helper function to get achievements for a sport
 * Returns: [Championships Won, Upcoming Matches, Overall Rating]
 */
export const getAchievements = (sport: SportType): number[] => {
  return currentUserData[sport].achievements;
};

/**
 * Helper function to get profile data for a sport
 */
export const getProfileData = (sport: SportType) => {
  const sportData = currentUserData[sport];
  return {
    hasUploadedProfileImage: sportData.hasUploadedProfileImage,
    customProfileImage: sportData.profileImage,
  };
};
