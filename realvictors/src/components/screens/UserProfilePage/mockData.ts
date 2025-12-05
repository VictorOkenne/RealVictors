/**
 * Mock Data for User Profile Page
 *
 * Contains sample data for user profiles, posts, stats, and matches
 */

import { ImageSourcePropType } from 'react-native';
import { SkillRating } from '../../widgets/UserProfile/PlayerRatings';
import { UserPosition } from '../../widgets/UserProfile/PositionSelector';
import { FormationType } from '../MatchPage/mockData';
import { RankingScope, StatRanking as PlayerRanking } from '../../widgets/AppWide/StatRankingsSection';
import { SoccerCareerStats, BasketballCareerStats } from '../../widgets/AppWide/CareerStatsSection';

export type SportType = 'soccer' | 'basketball';
export type { RankingScope, PlayerRanking, SoccerCareerStats, BasketballCareerStats };

export interface Team {
  name: string;
  logo: ImageSourcePropType;
}

export interface Nationality {
  name: string; // e.g., "USA", "Brazil", "Nigeria"
  flag: ImageSourcePropType; // Country flag image
}

export interface SportProfile {
  sport: SportType;
  teams: Team[]; // User can play for multiple teams in this sport
  position: string; // Sport-specific position (e.g., "Forward" for soccer, "Point Guard" for basketball)
  profileImage?: ImageSourcePropType; // Sport-specific profile image
  hasUploadedProfileImage: boolean;
  countryFlag?: ImageSourcePropType; // Country flag for player card
  gameStats: {
    totalWins: number;
    totalLosses: number;
    totalGames: number;
    winStreak: number; // Current win streak
    bestWinStreak: number; // Best win streak ever
    championshipsWon: number; // Championships won in this sport
    overallRating: number; // Overall rating for this sport (0-100)
    // Medal counts (podium finishes)
    goldMedals: number; // 1st place finishes
    silverMedals: number; // 2nd place finishes
    bronzeMedals: number; // 3rd place finishes
  };
  // Bio specific to this sport
  bio?: string;

  // Position information (redesigned)
  formation?: FormationType; // Soccer: preferred formation (e.g., "4-3-3"), Basketball: undefined
  positions: UserPosition[]; // User's preferred positions (primary, secondary, tertiary)

  // Skill-based rating information (out of 100)
  playerRating: {
    overallRating: number; // Overall rating (0-100)
    totalReviews: number;
    skillRatings: SkillRating[]; // 6 skill-based ratings
  };
}

export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isVerified: boolean;

  // Common info across all sports
  nationalities: Nationality[]; // Up to 4 nationalities
  height: string;
  bio?: string;

  // Social stats (shared across all sports)
  stats: {
    followers: string;
    following: string;
    posts: string;
  };

  // Sport-specific profiles
  sportProfiles: {
    soccer?: SportProfile;
    basketball?: SportProfile;
  };

  // Default sport to show when context is not provided
  defaultSport: SportType;
}

export interface UserPost {
  postId: string;
  images: ImageSourcePropType[];
  caption: string;
  hashtags: string;
  likes: string;
  comments: string;
  timeAgo: string;
  hasMultipleImages: boolean;
}

// Mock User Profile
export const mockUserProfile: UserProfile = {
  id: '1',
  username: '@michealhuston',
  firstName: 'Michael',
  lastName: 'Huston',
  fullName: 'Michael Huston',
  isVerified: true,
  nationalities: [
    {
      name: 'USA',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with actual USA flag
    },
    {
      name: 'Nigeria',
      flag: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with actual Nigeria flag
    },
    {
      name: 'Brazil',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with actual Brazil flag
    },
    // Uncomment below to test with 4 nationalities (flags-only display)
    // {
    //   name: 'England',
    //   flag: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with actual England flag
    // },
  ],
  height: '6.5ft',
  bio: 'Multi-sport athlete | Soccer & Basketball | New York born and raised',
  stats: {
    followers: '8',
    following: '5',
    posts: '6',
  },
  defaultSport: 'soccer', // User prefers soccer as default
  sportProfiles: {
    soccer: {
      sport: 'soccer',
      teams: [
        {
          name: 'Local FC',
          logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
        },
        {
          name: 'State Academy',
          logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
        },
      ],
      position: 'Forward',
      hasUploadedProfileImage: true,
      profileImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
      gameStats: {
        totalWins: 156,
        totalLosses: 98,
        totalGames: 254,
        winStreak: 5,
        bestWinStreak: 12,
        championshipsWon: 3,
        overallRating: 79,
        goldMedals: 3, // 1st place finishes
        silverMedals: 5, // 2nd place finishes
        bronzeMedals: 2, // 3rd place finishes
      },
      bio: 'Passionate about real-life matches and friendly competition. Always ready to challenge, Learn, and improve with every game.',

      // Preferred formation and positions
      formation: '4-3-3',
      positions: [
        { positionCode: 'RW', positionName: 'Right Winger', isPrimary: true, rank: 1 },
        { positionCode: 'ST', positionName: 'Striker', isPrimary: false, rank: 2 },
        { positionCode: 'CAM', positionName: 'Attacking Midfielder', isPrimary: false, rank: 3 },
      ],

      // Skill-based ratings (out of 100) - Calculated from actual reviews
      playerRating: {
        overallRating: 89, // Average from 8 reviews: (92+88+95+85+90+78+93+87)/8 = 89
        totalReviews: 8, // Matches mockReviews.length
        skillRatings: [
          { skill: 'pace', rating: 91 }, // Average: (95+90+97+88+93+82+94+89)/8 = 91
          { skill: 'shooting', rating: 86 }, // Average: (88+85+93+82+87+75+91+84)/8 = 86
          { skill: 'passing', rating: 90 }, // Average: (90+92+94+86+91+80+95+88)/8 = 90
          { skill: 'dribbling', rating: 89 }, // Average: (94+87+96+84+92+76+93+86)/8 = 89
          { skill: 'defending', rating: 85 }, // Average: (85+84+92+83+86+74+90+85)/8 = 85
          { skill: 'physical', rating: 89 }, // Average: (91+88+95+87+89+81+92+90)/8 = 89
        ],
      },
    },
    basketball: {
      sport: 'basketball',
      teams: [
        {
          name: 'NY Warriors',
          logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with basketball team logo
        },
      ],
      position: 'Point Guard',
      hasUploadedProfileImage: true,
      profileImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'), // Replace with basketball profile image
      gameStats: {
        totalWins: 89,
        totalLosses: 45,
        totalGames: 134,
        winStreak: 3,
        bestWinStreak: 8,
        championshipsWon: 2,
        overallRating: 82,
        goldMedals: 2, // 1st place finishes
        silverMedals: 3, // 2nd place finishes
        bronzeMedals: 4, // 3rd place finishes
      },
      bio: 'Basketball enthusiast with a passion for teamwork and strategy. Love pushing my limits on the court.',

      // No formation for basketball - positions only
      positions: [
        { positionCode: 'PG', positionName: 'Point Guard', isPrimary: true, rank: 1 },
        { positionCode: 'SG', positionName: 'Shooting Guard', isPrimary: false, rank: 2 },
      ],

      // Skill-based ratings (out of 100) - Calculated from mockBasketballReviews
      playerRating: {
        overallRating: 88, // Average from 8 basketball reviews: (91+87+93+84+89+80+92+86)/8 = 88
        totalReviews: 8, // Matches mockBasketballReviews.length
        skillRatings: [
          { skill: 'insideShooting', rating: 84 }, // Average: (88+82+90+79+86+75+89+83)/8 = 84
          { skill: 'midRangeShooting', rating: 88 }, // Average: (92+85+95+82+88+78+94+87)/8 = 88
          { skill: 'threePointShooting', rating: 88 }, // Average: (89+90+91+86+87+84+90+85)/8 = 88
          { skill: 'playmaking', rating: 91 }, // Average: (94+88+96+90+93+85+95+89)/8 = 91
          { skill: 'defense', rating: 86 }, // Average: (87+86+89+84+88+79+90+85)/8 = 86
          { skill: 'rebounding', rating: 84 }, // Average: (85+81+87+83+85+79+86+87)/8 = 84
        ],
      },
    },
  },
};

// Mock User Posts (for Highlights grid)
export const mockUserPosts: UserPost[] = [
  {
    postId: '1',
    images: [
      require('../../../assets/MockData/SocialMedia/socailmeadia1.jpg'),
      require('../../../assets/MockData/SocialMedia/socailmeadia2.jpg'),
    ],
    caption: 'Great game today! Proud of the team',
    hashtags: '#soccer #victory #teamwork',
    likes: '1,234',
    comments: '89',
    timeAgo: '2 hours ago',
    hasMultipleImages: true,
  },
  {
    postId: '2',
    images: [
      require('../../../assets/MockData/SocialMedia/socailmeadia3.jpg'),
    ],
    caption: 'Training hard for the next match',
    hashtags: '#training #dedication',
    likes: '987',
    comments: '45',
    timeAgo: '5 hours ago',
    hasMultipleImages: false,
  },
  {
    postId: '3',
    images: [
      require('../../../assets/MockData/SocialMedia/socailmeadia4.png'),
    ],
    caption: 'Game day vibes',
    hashtags: '#matchday #ready',
    likes: '2,156',
    comments: '123',
    timeAgo: '1 day ago',
    hasMultipleImages: false,
  },
  {
    postId: '4',
    images: [
      require('../../../assets/MockData/SocialMedia/socialmedia5.jpg'),
    ],
    caption: 'Amazing support from the fans',
    hashtags: '#fans #grateful',
    likes: '3,456',
    comments: '234',
    timeAgo: '2 days ago',
    hasMultipleImages: false,
  },
  {
    postId: '5',
    images: [
      require('../../../assets/MockData/SocialMedia/socialmedia6.png'),
    ],
    caption: 'Celebrating with the team',
    hashtags: '#victory #celebration',
    likes: '1,876',
    comments: '156',
    timeAgo: '3 days ago',
    hasMultipleImages: false,
  },
  {
    postId: '6',
    images: [
      require('../../../assets/MockData/SocialMedia/socialmedia7.jpg'),
    ],
    caption: 'Pre-match warmup',
    hashtags: '#warmup #focused',
    likes: '1,234',
    comments: '67',
    timeAgo: '4 days ago',
    hasMultipleImages: false,
  },
];

// This is no longer needed - we'll display stats differently
// Keeping for backwards compatibility if needed
export const mockProfileAchievements = [3, 5, 79];

// Mock viewing modes
export type ProfileViewMode = 'own' | 'other';

// Check if user is viewing their own profile
export const isOwnProfile = (userId: string, currentUserId: string): boolean => {
  return userId === currentUserId;
};

// Mock current user ID (for testing)
export const CURRENT_USER_ID = '1';

// ===============================
// Player Reviews Mock Data
// ===============================

export interface PlayerReview {
  reviewId: string;
  reviewerName: string;
  reviewerAvatar?: ImageSourcePropType;
  reviewerInitials?: string;
  timeAgo: string;
  date: string; // ISO date string for sorting
  overallRating: number; // 0-100
  skillRatings: SkillRating[];
  comment?: string;
  isVerified?: boolean;
}

// Soccer-specific reviews
export const mockSoccerReviews: PlayerReview[] = [
  {
    reviewId: '1',
    reviewerName: 'Marcus Johnson',
    reviewerInitials: 'MJ',
    timeAgo: '2 days ago',
    date: '2025-11-13',
    overallRating: 92,
    isVerified: true,
    skillRatings: [
      { skill: 'pace', rating: 95 },
      { skill: 'shooting', rating: 88 },
      { skill: 'passing', rating: 90 },
      { skill: 'dribbling', rating: 94 },
      { skill: 'defending', rating: 85 },
      { skill: 'physical', rating: 91 },
    ],
    comment: 'Absolutely incredible player! His pace and dribbling skills are top-notch. Watching him play is like watching poetry in motion. He has great vision and can read the game exceptionally well. Definitely one of the best players I\'ve had the pleasure of playing alongside.',
  },
  {
    reviewId: '2',
    reviewerName: 'Sarah Williams',
    reviewerInitials: 'SW',
    timeAgo: '5 days ago',
    date: '2025-11-10',
    overallRating: 88,
    isVerified: true,
    skillRatings: [
      { skill: 'pace', rating: 90 },
      { skill: 'shooting', rating: 85 },
      { skill: 'passing', rating: 92 },
      { skill: 'dribbling', rating: 87 },
      { skill: 'defending', rating: 84 },
      { skill: 'physical', rating: 88 },
    ],
    comment: 'Great team player with excellent passing ability. Always knows where to position himself on the field.',
  },
  {
    reviewId: '3',
    reviewerName: 'David Chen',
    reviewerInitials: 'DC',
    timeAgo: '1 week ago',
    date: '2025-11-08',
    overallRating: 95,
    isVerified: false,
    skillRatings: [
      { skill: 'pace', rating: 97 },
      { skill: 'shooting', rating: 93 },
      { skill: 'passing', rating: 94 },
      { skill: 'dribbling', rating: 96 },
      { skill: 'defending', rating: 92 },
      { skill: 'physical', rating: 95 },
    ],
    comment: 'This guy is a beast! Literally unstoppable on the field. His combination of speed, skill, and football IQ is unmatched. Every time he gets the ball, something exciting happens. His work ethic during training is also phenomenal - always the first to arrive and last to leave. A true professional and a joy to play with.',
  },
  {
    reviewId: '4',
    reviewerName: 'Emma Rodriguez',
    reviewerInitials: 'ER',
    timeAgo: '1 week ago',
    date: '2025-11-08',
    overallRating: 85,
    skillRatings: [
      { skill: 'pace', rating: 88 },
      { skill: 'shooting', rating: 82 },
      { skill: 'passing', rating: 86 },
      { skill: 'dribbling', rating: 84 },
      { skill: 'defending', rating: 83 },
      { skill: 'physical', rating: 87 },
    ],
    comment: 'Solid all-around player. Could improve on finishing but has great potential.',
  },
  {
    reviewId: '5',
    reviewerName: 'James Thompson',
    reviewerInitials: 'JT',
    timeAgo: '2 weeks ago',
    date: '2025-11-01',
    overallRating: 90,
    isVerified: true,
    skillRatings: [
      { skill: 'pace', rating: 93 },
      { skill: 'shooting', rating: 87 },
      { skill: 'passing', rating: 91 },
      { skill: 'dribbling', rating: 92 },
      { skill: 'defending', rating: 86 },
      { skill: 'physical', rating: 89 },
    ],
    comment: 'Played against him last season and he was by far the toughest opponent we faced. His ability to control the tempo of the game is remarkable. Even when we double-teamed him, he found ways to create opportunities. Massive respect for his skill level!',
  },
  {
    reviewId: '6',
    reviewerName: 'Alex Martinez',
    reviewerInitials: 'AM',
    timeAgo: '3 weeks ago',
    date: '2025-10-25',
    overallRating: 78,
    skillRatings: [
      { skill: 'pace', rating: 82 },
      { skill: 'shooting', rating: 75 },
      { skill: 'passing', rating: 80 },
      { skill: 'dribbling', rating: 76 },
      { skill: 'defending', rating: 74 },
      { skill: 'physical', rating: 81 },
    ],
    comment: 'Good player but has room for improvement in shooting accuracy.',
  },
  {
    reviewId: '7',
    reviewerName: 'Olivia Brown',
    reviewerInitials: 'OB',
    timeAgo: '3 weeks ago',
    date: '2025-10-25',
    overallRating: 93,
    isVerified: true,
    skillRatings: [
      { skill: 'pace', rating: 94 },
      { skill: 'shooting', rating: 91 },
      { skill: 'passing', rating: 95 },
      { skill: 'dribbling', rating: 93 },
      { skill: 'defending', rating: 90 },
      { skill: 'physical', rating: 92 },
    ],
    comment: 'Outstanding player! His vision and passing range are exceptional. He can pick out passes that most players wouldn\'t even see. Very professional attitude and always encourages his teammates. Would love to play with him again!',
  },
  {
    reviewId: '8',
    reviewerName: 'Michael Davis',
    reviewerInitials: 'MD',
    timeAgo: '1 month ago',
    date: '2025-10-15',
    overallRating: 87,
    skillRatings: [
      { skill: 'pace', rating: 89 },
      { skill: 'shooting', rating: 84 },
      { skill: 'passing', rating: 88 },
      { skill: 'dribbling', rating: 86 },
      { skill: 'defending', rating: 85 },
      { skill: 'physical', rating: 90 },
    ],
    comment: 'Strong and fast. Great physical presence on the field.',
  },
];

// Basketball-specific reviews
export const mockBasketballReviews: PlayerReview[] = [
  {
    reviewId: 'b1',
    reviewerName: 'Jordan Mitchell',
    reviewerInitials: 'JM',
    timeAgo: '3 days ago',
    date: '2025-11-12',
    overallRating: 91,
    isVerified: true,
    skillRatings: [
      { skill: 'insideShooting', rating: 88 },
      { skill: 'midRangeShooting', rating: 92 },
      { skill: 'threePointShooting', rating: 89 },
      { skill: 'playmaking', rating: 94 },
      { skill: 'defense', rating: 87 },
      { skill: 'rebounding', rating: 85 },
    ],
    comment: 'Exceptional court vision and playmaking ability. His mid-range game is virtually unstoppable, and he consistently makes the right decisions under pressure. A true floor general who elevates everyone around him.',
  },
  {
    reviewId: 'b2',
    reviewerName: 'DeShawn Williams',
    reviewerInitials: 'DW',
    timeAgo: '1 week ago',
    date: '2025-11-08',
    overallRating: 87,
    isVerified: true,
    skillRatings: [
      { skill: 'insideShooting', rating: 82 },
      { skill: 'midRangeShooting', rating: 85 },
      { skill: 'threePointShooting', rating: 90 },
      { skill: 'playmaking', rating: 88 },
      { skill: 'defense', rating: 86 },
      { skill: 'rebounding', rating: 81 },
    ],
    comment: 'Deadly from beyond the arc! His three-point shooting keeps defenses honest. Great team player who knows how to move without the ball.',
  },
  {
    reviewId: 'b3',
    reviewerName: 'Marcus Thompson',
    reviewerInitials: 'MT',
    timeAgo: '1 week ago',
    date: '2025-11-08',
    overallRating: 93,
    isVerified: false,
    skillRatings: [
      { skill: 'insideShooting', rating: 90 },
      { skill: 'midRangeShooting', rating: 95 },
      { skill: 'threePointShooting', rating: 91 },
      { skill: 'playmaking', rating: 96 },
      { skill: 'defense', rating: 89 },
      { skill: 'rebounding', rating: 87 },
    ],
    comment: 'One of the most complete point guards I\'ve played with. His basketball IQ is off the charts - he reads plays before they develop and always seems to be two steps ahead. Can score from anywhere on the court and makes everyone better. Elite talent!',
  },
  {
    reviewId: 'b4',
    reviewerName: 'Ashley Carter',
    reviewerInitials: 'AC',
    timeAgo: '2 weeks ago',
    date: '2025-11-01',
    overallRating: 84,
    skillRatings: [
      { skill: 'insideShooting', rating: 79 },
      { skill: 'midRangeShooting', rating: 82 },
      { skill: 'threePointShooting', rating: 86 },
      { skill: 'playmaking', rating: 90 },
      { skill: 'defense', rating: 84 },
      { skill: 'rebounding', rating: 83 },
    ],
    comment: 'Great playmaker with solid defensive instincts. Could improve finishing at the rim but overall a very reliable player.',
  },
  {
    reviewId: 'b5',
    reviewerName: 'Chris Anderson',
    reviewerInitials: 'CA',
    timeAgo: '2 weeks ago',
    date: '2025-11-01',
    overallRating: 89,
    isVerified: true,
    skillRatings: [
      { skill: 'insideShooting', rating: 86 },
      { skill: 'midRangeShooting', rating: 88 },
      { skill: 'threePointShooting', rating: 87 },
      { skill: 'playmaking', rating: 93 },
      { skill: 'defense', rating: 88 },
      { skill: 'rebounding', rating: 85 },
    ],
    comment: 'Played against this guy in the playoffs - he absolutely controlled the tempo of every game. His ability to orchestrate the offense and find open teammates is remarkable. Tough defender too, always in the right position.',
  },
  {
    reviewId: 'b6',
    reviewerName: 'Tyler Brooks',
    reviewerInitials: 'TB',
    timeAgo: '3 weeks ago',
    date: '2025-10-25',
    overallRating: 80,
    skillRatings: [
      { skill: 'insideShooting', rating: 75 },
      { skill: 'midRangeShooting', rating: 78 },
      { skill: 'threePointShooting', rating: 84 },
      { skill: 'playmaking', rating: 85 },
      { skill: 'defense', rating: 79 },
      { skill: 'rebounding', rating: 79 },
    ],
    comment: 'Good shooter and decent passer. Needs to work on defense and finishing inside but has good potential.',
  },
  {
    reviewId: 'b7',
    reviewerName: 'Jasmine Reed',
    reviewerInitials: 'JR',
    timeAgo: '3 weeks ago',
    date: '2025-10-25',
    overallRating: 92,
    isVerified: true,
    skillRatings: [
      { skill: 'insideShooting', rating: 89 },
      { skill: 'midRangeShooting', rating: 94 },
      { skill: 'threePointShooting', rating: 90 },
      { skill: 'playmaking', rating: 95 },
      { skill: 'defense', rating: 90 },
      { skill: 'rebounding', rating: 86 },
    ],
    comment: 'Incredible basketball player! His court awareness and decision-making are top-tier. He can take over a game when needed but prefers to get his teammates involved. Very impressive all-around skill set.',
  },
  {
    reviewId: 'b8',
    reviewerName: 'Brandon Lee',
    reviewerInitials: 'BL',
    timeAgo: '1 month ago',
    date: '2025-10-15',
    overallRating: 86,
    skillRatings: [
      { skill: 'insideShooting', rating: 83 },
      { skill: 'midRangeShooting', rating: 87 },
      { skill: 'threePointShooting', rating: 85 },
      { skill: 'playmaking', rating: 89 },
      { skill: 'defense', rating: 85 },
      { skill: 'rebounding', rating: 87 },
    ],
    comment: 'Solid all-around guard. Good basketball fundamentals and plays smart.',
  },
];

// Default export for backward compatibility (soccer)
export const mockReviews = mockSoccerReviews;

// ===============================
// Player Stats Mock Data
// ===============================

// Basketball stats
// Career stats interfaces (types imported from AppWide/CareerStatsSection)

// Player rankings (types imported from AppWide/StatRankingsSection)

// Game log entry
export interface GameLog {
  gameId: string;
  date: string;
  homeTeam: {
    name: string;
    logo: ImageSourcePropType;
    score: number;
  };
  awayTeam: {
    name: string;
    logo: ImageSourcePropType;
    score: number;
  };
  userTeam: 'home' | 'away'; // Which team the user played for
  stats: {
    [key: string]: number | string;
  };
}

// Career average entry (league/season stats)
export interface CareerAverage {
  seasonId: string;
  season: string; // e.g., "2024-2025 Season"
  team: {
    name: string;
    logo: ImageSourcePropType;
  };
  league: string; // e.g., "Premier League", "NBA"
  gamesPlayed: number; // Number of games played in this season
  stats: {
    [key: string]: number | string;
  };
  totals: {
    [key: string]: number | string;
  };
}

// Mock Basketball Career Stats
export const mockBasketballCareerStats: BasketballCareerStats = {
  gameHigh: {
    points: 34,
    rebounds: 27,
    assists: 15,
    blocks: 2,
    steals: 5,
    minutesPlayed: 42,
    fieldGoalPercentage: 68.5,
    freeThrowPercentage: 92.3,
    threePointPercentage: 60.0,
  },
  seasonHigh: {
    points: 892,
    rebounds: 324,
    assists: 245,
    blocks: 48,
    steals: 87,
    wins: 28,
    gamesPlayed: 35,
    minutesPlayed: 1240,
    winStreak: 12,
    fieldGoalPercentage: 52.8,
    freeThrowPercentage: 88.9,
    threePointPercentage: 42.5,
  },
  averagesPerGame: {
    points: 18.5,
    rebounds: 8.2,
    assists: 6.5,
    blocks: 1.2,
    steals: 2.1,
    minutesPlayed: 32.4,
    fieldGoalPercentage: 45.5,
    freeThrowPercentage: 78.3,
    threePointPercentage: 35.2,
  },
  averagesPerSeason: {
    points: 654.2,
    rebounds: 289.5,
    assists: 229.8,
    blocks: 42.3,
    steals: 74.2,
    minutesPlayed: 1145.6,
    fieldGoalPercentage: 45.5,
    freeThrowPercentage: 78.3,
    threePointPercentage: 35.2,
  },
  totals: {
    wins: 89,
    losses: 45,
    points: 2478,
    rebounds: 1098,
    assists: 871,
    blocks: 161,
    steals: 281,
    gamesPlayed: 134,
    minutesPlayed: 4342,
    highestWinStreak: 12,
  },
};

// Mock Soccer Career Stats
export const mockSoccerCareerStats: SoccerCareerStats = {
  gameHigh: {
    goals: 5,
    assists: 4,
    tackles: 8,
    successfulDribbles: 15,
    shotsOnTarget: 12,
    passingAccuracy: 94.5,
    shotAccuracy: 83.3,
  },
  seasonHigh: {
    goals: 42,
    assists: 28,
    tackles: 156,
    successfulDribbles: 487,
    passingAccuracy: 89.7,
    shotAccuracy: 71.2,
    wins: 32,
    gamesPlayed: 48,
    minutesPlayed: 4140,
    winStreak: 15,
  },
  averagesPerGame: {
    goals: 0.8,
    assists: 0.5,
    tackles: 2.3,
    successfulDribbles: 4.1,
    passingAccuracy: 85.2,
    shotsOnTarget: 3.2,
    shotAccuracy: 58.7,
    minutesPlayed: 78.5,
  },
  averagesPerSeason: {
    goals: 33.8,
    assists: 21.2,
    tackles: 97.3,
    successfulDribbles: 171.7,
    passingAccuracy: 85.2,
    shotsOnTarget: 134.2,
    shotAccuracy: 58.7,
    minutesPlayed: 3287.5,
  },
  totals: {
    wins: 156,
    losses: 98,
    draws: 45,
    gamesPlayed: 254,
    goals: 203,
    assists: 127,
    tackles: 584,
    successfulDribbles: 1034,
    minutesPlayed: 19725,
    highestWinStreak: 15,
    yellowCards: 23,
    redCards: 2,
  },
};

// Basketball Rankings by Scope
export const mockBasketballRankingsByScope: Record<RankingScope, PlayerRanking[]> = {
  league: [
    { statName: 'Points', rank: 1, value: '16.7k', scope: 'league', scopeLabel: 'NBA League' },
    { statName: 'Rebounds', rank: 126, value: '548', scope: 'league', scopeLabel: 'NBA League' },
    { statName: 'Assists', rank: 3, value: '2345', scope: 'league', scopeLabel: 'NBA League' },
    { statName: 'Steals', rank: 12, value: '456', scope: 'league', scopeLabel: 'NBA League' },
    { statName: 'Blocks', rank: 8, value: '289', scope: 'league', scopeLabel: 'NBA League' },
  ],
  city: [
    { statName: 'Points', rank: 1, value: '16.7k', scope: 'city', scopeLabel: 'New York City' },
    { statName: 'Rebounds', rank: 5, value: '548', scope: 'city', scopeLabel: 'New York City' },
    { statName: 'Assists', rank: 2, value: '2345', scope: 'city', scopeLabel: 'New York City' },
    { statName: 'Steals', rank: 3, value: '456', scope: 'city', scopeLabel: 'New York City' },
    { statName: 'Blocks', rank: 1, value: '289', scope: 'city', scopeLabel: 'New York City' },
  ],
  state: [
    { statName: 'Points', rank: 2, value: '16.7k', scope: 'state', scopeLabel: 'New York State' },
    { statName: 'Rebounds', rank: 18, value: '548', scope: 'state', scopeLabel: 'New York State' },
    { statName: 'Assists', rank: 5, value: '2345', scope: 'state', scopeLabel: 'New York State' },
    { statName: 'Steals', rank: 7, value: '456', scope: 'state', scopeLabel: 'New York State' },
    { statName: 'Blocks', rank: 4, value: '289', scope: 'state', scopeLabel: 'New York State' },
  ],
  country: [
    { statName: 'Points', rank: 15, value: '16.7k', scope: 'country', scopeLabel: 'United States' },
    { statName: 'Rebounds', rank: 89, value: '548', scope: 'country', scopeLabel: 'United States' },
    { statName: 'Assists', rank: 12, value: '2345', scope: 'country', scopeLabel: 'United States' },
    { statName: 'Steals', rank: 34, value: '456', scope: 'country', scopeLabel: 'United States' },
    { statName: 'Blocks', rank: 21, value: '289', scope: 'country', scopeLabel: 'United States' },
  ],
  worldwide: [
    { statName: 'Points', rank: 234, value: '16.7k', scope: 'worldwide', scopeLabel: 'Worldwide' },
    { statName: 'Rebounds', rank: 1456, value: '548', scope: 'worldwide', scopeLabel: 'Worldwide' },
    { statName: 'Assists', rank: 89, value: '2345', scope: 'worldwide', scopeLabel: 'Worldwide' },
    { statName: 'Steals', rank: 567, value: '456', scope: 'worldwide', scopeLabel: 'Worldwide' },
    { statName: 'Blocks', rank: 345, value: '289', scope: 'worldwide', scopeLabel: 'Worldwide' },
  ],
};

// Soccer Rankings by Scope
export const mockSoccerRankingsByScope: Record<RankingScope, PlayerRanking[]> = {
  league: [
    { statName: 'Goals', rank: 2, value: '203', scope: 'league', scopeLabel: 'Premier League' },
    { statName: 'Assists', rank: 15, value: '127', scope: 'league', scopeLabel: 'Premier League' },
    { statName: 'Tackles', rank: 45, value: '584', scope: 'league', scopeLabel: 'Premier League' },
    { statName: 'Dribbles', rank: 8, value: '892', scope: 'league', scopeLabel: 'Premier League' },
  ],
  city: [
    { statName: 'Goals', rank: 1, value: '203', scope: 'city', scopeLabel: 'London' },
    { statName: 'Assists', rank: 3, value: '127', scope: 'city', scopeLabel: 'London' },
    { statName: 'Tackles', rank: 12, value: '584', scope: 'city', scopeLabel: 'London' },
    { statName: 'Dribbles', rank: 2, value: '892', scope: 'city', scopeLabel: 'London' },
  ],
  state: [
    { statName: 'Goals', rank: 5, value: '203', scope: 'state', scopeLabel: 'England' },
    { statName: 'Assists', rank: 8, value: '127', scope: 'state', scopeLabel: 'England' },
    { statName: 'Tackles', rank: 23, value: '584', scope: 'state', scopeLabel: 'England' },
    { statName: 'Dribbles', rank: 6, value: '892', scope: 'state', scopeLabel: 'England' },
  ],
  country: [
    { statName: 'Goals', rank: 18, value: '203', scope: 'country', scopeLabel: 'United Kingdom' },
    { statName: 'Assists', rank: 34, value: '127', scope: 'country', scopeLabel: 'United Kingdom' },
    { statName: 'Tackles', rank: 67, value: '584', scope: 'country', scopeLabel: 'United Kingdom' },
    { statName: 'Dribbles', rank: 21, value: '892', scope: 'country', scopeLabel: 'United Kingdom' },
  ],
  worldwide: [
    { statName: 'Goals', rank: 456, value: '203', scope: 'worldwide', scopeLabel: 'Worldwide' },
    { statName: 'Assists', rank: 789, value: '127', scope: 'worldwide', scopeLabel: 'Worldwide' },
    { statName: 'Tackles', rank: 1234, value: '584', scope: 'worldwide', scopeLabel: 'Worldwide' },
    { statName: 'Dribbles', rank: 567, value: '892', scope: 'worldwide', scopeLabel: 'Worldwide' },
  ],
};

// Default exports for backwards compatibility
export const mockBasketballRankings = mockBasketballRankingsByScope.league;
export const mockSoccerRankings = mockSoccerRankingsByScope.league;

// ===============================
// Followers/Following Mock Data
// ===============================

export interface FollowerUser {
  id: string;
  fullName: string;
  position: string;
  playerNumber: number;
  teamName: string;
  teamLogo: ImageSourcePropType;
  playerImage?: ImageSourcePropType;
  isFollowing: boolean; // Whether current user is following this person
}

// Mock Followers List (People who follow the current user)
export const mockFollowers: FollowerUser[] = [
  {
    id: 'f1',
    fullName: 'Memphis Depay',
    position: 'Striker',
    playerNumber: 79,
    teamName: 'Barcelona',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/mbappe.png'),
    isFollowing: true, // Current user follows them back
  },
  {
    id: 'f2',
    fullName: 'Cole Palmer',
    position: 'Attacking Midfielder',
    playerNumber: 20,
    teamName: 'Chelsea',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
    isFollowing: true,
  },
  {
    id: 'f3',
    fullName: 'Levi Colwill',
    position: 'Defender',
    playerNumber: 6,
    teamName: 'Chelsea',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
    isFollowing: false, // Current user doesn't follow them back
  },
  {
    id: 'f4',
    fullName: 'Malo Gusto',
    position: 'Right Back',
    playerNumber: 27,
    teamName: 'Chelsea',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
    isFollowing: true,
  },
  {
    id: 'f5',
    fullName: 'Wesley Fofana',
    position: 'Center Back',
    playerNumber: 33,
    teamName: 'Chelsea',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/wesley-fofana.png'),
    isFollowing: false,
  },
  {
    id: 'f6',
    fullName: 'Achraf Hakimi',
    position: 'Right Back',
    playerNumber: 2,
    teamName: 'PSG',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/hakimi.png'),
    isFollowing: true,
  },
  {
    id: 'f7',
    fullName: 'Ousmane Dembele',
    position: 'Winger',
    playerNumber: 10,
    teamName: 'PSG',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/dembele.png'),
    isFollowing: true,
  },
  {
    id: 'f8',
    fullName: 'Marquinhos',
    position: 'Center Back',
    playerNumber: 5,
    teamName: 'PSG',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/marquinhos.png'),
    isFollowing: false,
  },
];

// Mock Following List (People the current user follows)
export const mockFollowing: FollowerUser[] = [
  {
    id: 'fw1',
    fullName: 'Memphis Depay',
    position: 'Striker',
    playerNumber: 79,
    teamName: 'Barcelona',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/mbappe.png'),
    isFollowing: true, // Always true for following list
  },
  {
    id: 'fw2',
    fullName: 'Cole Palmer',
    position: 'Attacking Midfielder',
    playerNumber: 20,
    teamName: 'Chelsea',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
    isFollowing: true,
  },
  {
    id: 'fw3',
    fullName: 'Malo Gusto',
    position: 'Right Back',
    playerNumber: 27,
    teamName: 'Chelsea',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
    isFollowing: true,
  },
  {
    id: 'fw4',
    fullName: 'Achraf Hakimi',
    position: 'Right Back',
    playerNumber: 2,
    teamName: 'PSG',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/hakimi.png'),
    isFollowing: true,
  },
  {
    id: 'fw5',
    fullName: 'Ousmane Dembele',
    position: 'Winger',
    playerNumber: 10,
    teamName: 'PSG',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    playerImage: require('../../../assets/MockData/MatchPage/dembele.png'),
    isFollowing: true,
  },
];

// Mock Basketball Game Logs
export const mockBasketballGameLogs: GameLog[] = [
  {
    gameId: 'bb1',
    date: 'Sat Nov 15 2025',
    homeTeam: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 108,
    },
    awayTeam: {
      name: 'Boston Stars',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 95,
    },
    userTeam: 'home', // User won at home
    stats: {
      PTS: 28,
      REB: 12,
      AST: 9,
      BLK: 2,
      STL: 3,
      'FG%': 54,
      'FT%': 85,
      '3P%': 42,
    },
  },
  {
    gameId: 'bb2',
    date: 'Wed Nov 12 2025',
    homeTeam: {
      name: 'Miami Heat',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 118,
    },
    awayTeam: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 112,
    },
    userTeam: 'away', // User lost away
    stats: {
      PTS: 22,
      REB: 6,
      AST: 14,
      BLK: 1,
      STL: 2,
      'FG%': 48,
      'FT%': 78,
      '3P%': 35,
    },
  },
  {
    gameId: 'bb3',
    date: 'Sun Nov 9 2025',
    homeTeam: {
      name: 'LA Lakers',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 119,
    },
    awayTeam: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 124,
    },
    userTeam: 'away', // User won away
    stats: {
      PTS: 34,
      REB: 8,
      AST: 11,
      BLK: 0,
      STL: 4,
      'FG%': 62,
      'FT%': 88,
      '3P%': 50,
    },
  },
  {
    gameId: 'bb4',
    date: 'Thu Nov 6 2025',
    homeTeam: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 98,
    },
    awayTeam: {
      name: 'Chicago Bulls',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 103,
    },
    userTeam: 'home', // User lost at home
    stats: {
      PTS: 19,
      REB: 5,
      AST: 8,
      BLK: 1,
      STL: 1,
      'FG%': 41,
      'FT%': 72,
      '3P%': 28,
    },
  },
  {
    gameId: 'bb5',
    date: 'Mon Nov 3 2025',
    homeTeam: {
      name: 'Brooklyn Nets',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 109,
    },
    awayTeam: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 115,
    },
    userTeam: 'away', // User won away
    stats: {
      PTS: 25,
      REB: 7,
      AST: 13,
      BLK: 2,
      STL: 3,
      'FG%': 52,
      'FT%': 82,
      '3P%': 38,
    },
  },
];

// Mock Soccer Game Logs
export const mockSoccerGameLogs: GameLog[] = [
  {
    gameId: 's1',
    date: 'Sat Nov 15 2025',
    homeTeam: {
      name: 'PSG',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 2,
    },
    awayTeam: {
      name: 'Local FC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 3,
    },
    userTeam: 'away', // User won away
    stats: {
      Goals: 2,
      Assists: 1,
      Tackles: 5,
      'Pass Acc.': 89,
      Dribbles: 9,
      'Shot on Target': 7,
      'Yellow Cards': 0,
      'Red Card': 0,
    },
  },
  {
    gameId: 's2',
    date: 'Wed Nov 12 2025',
    homeTeam: {
      name: 'Local FC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 1,
    },
    awayTeam: {
      name: 'Man City',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 2,
    },
    userTeam: 'home', // User lost at home
    stats: {
      Goals: 1,
      Assists: 0,
      Tackles: 4,
      'Pass Acc.': 82,
      Dribbles: 6,
      'Shot on Target': 4,
      'Yellow Cards': 1,
      'Red Card': 0,
    },
  },
  {
    gameId: 's3',
    date: 'Sun Nov 9 2025',
    homeTeam: {
      name: 'Local FC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 4,
    },
    awayTeam: {
      name: 'Liverpool',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 1,
    },
    userTeam: 'home', // User won at home
    stats: {
      Goals: 3,
      Assists: 2,
      Tackles: 3,
      'Pass Acc.': 92,
      Dribbles: 12,
      'Shot on Target': 9,
      'Yellow Cards': 0,
      'Red Card': 0,
    },
  },
  {
    gameId: 's4',
    date: 'Thu Nov 6 2025',
    homeTeam: {
      name: 'Real Madrid',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 3,
    },
    awayTeam: {
      name: 'Local FC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 0,
    },
    userTeam: 'away', // User lost away
    stats: {
      Goals: 0,
      Assists: 0,
      Tackles: 6,
      'Pass Acc.': 75,
      Dribbles: 4,
      'Shot on Target': 2,
      'Yellow Cards': 2,
      'Red Card': 0,
    },
  },
  {
    gameId: 's5',
    date: 'Mon Nov 3 2025',
    homeTeam: {
      name: 'Local FC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 2,
    },
    awayTeam: {
      name: 'Barcelona',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 2,
    },
    userTeam: 'home', // Draw at home
    stats: {
      Goals: 1,
      Assists: 1,
      Tackles: 5,
      'Pass Acc.': 88,
      Dribbles: 8,
      'Shot on Target': 5,
      'Yellow Cards': 1,
      'Red Card': 0,
    },
  },
];

// Mock Basketball Career Averages (League/Season Stats)
export const mockBasketballCareerAverages: CareerAverage[] = [
  {
    seasonId: 'bb-avg-1',
    season: '2024-2025 Season',
    team: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    league: 'NBA',
    gamesPlayed: 35,
    stats: {
      'PTS': 18.5,
      'REB': 8.2,
      'AST': 6.5,
      'BLK': 1.2,
      'STL': 2.1,
      'FG%': 45.5,
      'FT%': 78.3,
      '3P%': 35.2,
    },
    totals: {
      'PTS': 648,
      'REB': 287,
      'AST': 228,
      'BLK': 42,
      'STL': 74,
      'FG%': 45.5,
      'FT%': 78.3,
      '3P%': 35.2,
    },
  },
  {
    seasonId: 'bb-avg-2',
    season: '2023-2024 Season',
    team: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    league: 'NBA',
    gamesPlayed: 42,
    stats: {
      'PTS': 16.8,
      'REB': 7.5,
      'AST': 5.9,
      'BLK': 1.0,
      'STL': 1.8,
      'FG%': 43.2,
      'FT%': 75.6,
      '3P%': 32.8,
    },
    totals: {
      'PTS': 706,
      'REB': 315,
      'AST': 248,
      'BLK': 42,
      'STL': 76,
      'FG%': 43.2,
      'FT%': 75.6,
      '3P%': 32.8,
    },
  },
  {
    seasonId: 'bb-avg-3',
    season: '2022-2023 Season',
    team: {
      name: 'NY Warriors',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    league: 'NBA',
    gamesPlayed: 38,
    stats: {
      'PTS': 15.2,
      'REB': 6.8,
      'AST': 5.2,
      'BLK': 0.9,
      'STL': 1.6,
      'FG%': 41.8,
      'FT%': 73.4,
      '3P%': 30.5,
    },
    totals: {
      'PTS': 578,
      'REB': 258,
      'AST': 198,
      'BLK': 34,
      'STL': 61,
      'FG%': 41.8,
      'FT%': 73.4,
      '3P%': 30.5,
    },
  },
];

// Mock Soccer Career Averages (League/Season Stats)
export const mockSoccerCareerAverages: CareerAverage[] = [
  {
    seasonId: 'soc-avg-1',
    season: '2024-2025 Season',
    team: {
      name: 'Local FC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    league: 'Premier League',
    gamesPlayed: 48,
    stats: {
      'Goals': 0.8,
      'Assists': 0.5,
      'Tackles': 2.3,
      'Pass Acc.': 85.2,
      'Shot on Target': 3.2,
      'Dribbles': 4.1,
      'Yellow Cards': 0.1,
      'Red Card': 0.0,
    },
    totals: {
      'Goals': 38,
      'Assists': 24,
      'Tackles': 110,
      'Pass Acc.': 85.2,
      'Shot on Target': 154,
      'Dribbles': 197,
      'Yellow Cards': 5,
      'Red Card': 0,
    },
  },
  {
    seasonId: 'soc-avg-2',
    season: '2023-2024 Season',
    team: {
      name: 'Local FC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    league: 'Premier League',
    gamesPlayed: 45,
    stats: {
      'Goals': 0.7,
      'Assists': 0.4,
      'Tackles': 2.1,
      'Pass Acc.': 83.8,
      'Shot on Target': 2.9,
      'Dribbles': 3.8,
      'Yellow Cards': 0.1,
      'Red Card': 0.0,
    },
    totals: {
      'Goals': 32,
      'Assists': 18,
      'Tackles': 95,
      'Pass Acc.': 83.8,
      'Shot on Target': 131,
      'Dribbles': 171,
      'Yellow Cards': 6,
      'Red Card': 0,
    },
  },
  {
    seasonId: 'soc-avg-3',
    season: '2022-2023 Season',
    team: {
      name: 'State Academy',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    league: 'Championship',
    gamesPlayed: 40,
    stats: {
      'Goals': 0.6,
      'Assists': 0.3,
      'Tackles': 1.9,
      'Pass Acc.': 82.1,
      'Shot on Target': 2.5,
      'Dribbles': 3.4,
      'Yellow Cards': 0.1,
      'Red Card': 0.0,
    },
    totals: {
      'Goals': 24,
      'Assists': 12,
      'Tackles': 76,
      'Pass Acc.': 82.1,
      'Shot on Target': 100,
      'Dribbles': 136,
      'Yellow Cards': 4,
      'Red Card': 0,
    },
  },
];
