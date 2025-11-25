/**
 * Mock Data for SearchPage
 *
 * This file contains all the dummy/mock data used in the MainSearchPage component.
 *
 * Purpose:
 * - Keeps the MainSearchPage component clean and focused on UI logic
 * - Makes it easy to remove or replace with real data from API/database
 * - Centralizes test data for development
 *
 * To replace with real data:
 * 1. Create API service calls or database queries
 * 2. Replace imports in MainSearchPage.tsx
 * 3. Delete this file when no longer needed
 */

import { ImageSourcePropType } from 'react-native';

/**
 * Player Search Results
 * Mock data for player search results
 */
export const mockPlayers = [
  // Soccer Players
  {
    id: 'player-1',
    fullName: 'Cole Palmer',
    username: 'colepalmer',
    position: 'Midfielder',
    playerNumber: 20,
    teamName: 'Chelsea FC',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'England',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
    isVerified: true,
  },
  {
    id: 'player-2',
    fullName: 'Kylian Mbappé',
    username: 'kmbappe',
    position: 'Forward',
    playerNumber: 7,
    teamName: 'Real Madrid',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'France',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/mbappe.png'),
    isVerified: true,
  },
  {
    id: 'player-3',
    fullName: 'Ousmane Dembélé',
    username: 'o_dembele',
    position: 'Forward',
    playerNumber: 11,
    teamName: 'Paris Saint-Germain',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    country: 'France',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/dembele.png'),
    isVerified: true,
  },
  {
    id: 'player-4',
    fullName: 'Achraf Hakimi',
    username: 'achrafhakimi',
    position: 'Defender',
    playerNumber: 2,
    teamName: 'Paris Saint-Germain',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    country: 'Morocco',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/hakimi.png'),
    isVerified: true,
  },
  {
    id: 'player-5',
    fullName: 'Levi Colwill',
    username: 'levicolwill',
    position: 'Defender',
    playerNumber: 6,
    teamName: 'Chelsea FC',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'England',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
    isVerified: false,
  },
  {
    id: 'player-6',
    fullName: 'Wesley Fofana',
    username: 'wesleyfofana',
    position: 'Defender',
    playerNumber: 33,
    teamName: 'Chelsea FC',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'France',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/wesley-fofana.png'),
    isVerified: false,
  },
  {
    id: 'player-7',
    fullName: 'Malo Gusto',
    username: 'malogusto',
    position: 'Defender',
    playerNumber: 27,
    teamName: 'Chelsea FC',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'France',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
    isVerified: false,
  },
  {
    id: 'player-8',
    fullName: 'Marquinhos',
    username: 'marquinhos',
    position: 'Defender',
    playerNumber: 5,
    teamName: 'Paris Saint-Germain',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    country: 'Brazil',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/marquinhos.png'),
    isVerified: true,
  },
  {
    id: 'player-9',
    fullName: 'Neymar Junior',
    username: 'neymarjr',
    position: 'Forward',
    playerNumber: 10,
    teamName: 'Al Hilal',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'Brazil',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/mbappe.png'),
    isVerified: true,
  },
  {
    id: 'player-10',
    fullName: 'Lionel Messi',
    username: 'leomessi',
    position: 'Forward',
    playerNumber: 10,
    teamName: 'Inter Miami',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'Argentina',
    sport: 'soccer' as const,
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
    isVerified: true,
  },
  // Basketball Players
  {
    id: 'player-11',
    fullName: 'LeBron James',
    username: 'kingjames',
    position: 'Small Forward',
    playerNumber: 23,
    teamName: 'Los Angeles Lakers',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'USA',
    sport: 'basketball' as const,
    playerImage: require('../../../assets/MockData/MatchPage/dembele.png'),
    isVerified: true,
  },
  {
    id: 'player-12',
    fullName: 'Stephen Curry',
    username: 'stephencurry30',
    position: 'Point Guard',
    playerNumber: 30,
    teamName: 'Golden State Warriors',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'USA',
    sport: 'basketball' as const,
    playerImage: require('../../../assets/MockData/MatchPage/hakimi.png'),
    isVerified: true,
  },
  {
    id: 'player-13',
    fullName: 'Kevin Durant',
    username: 'kdtrey5',
    position: 'Power Forward',
    playerNumber: 35,
    teamName: 'Phoenix Suns',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    country: 'USA',
    sport: 'basketball' as const,
    playerImage: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
    isVerified: true,
  },
  {
    id: 'player-14',
    fullName: 'Giannis Antetokounmpo',
    username: 'giannis_an34',
    position: 'Power Forward',
    playerNumber: 34,
    teamName: 'Milwaukee Bucks',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    country: 'Greece',
    sport: 'basketball' as const,
    playerImage: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
    isVerified: true,
  },
  {
    id: 'player-15',
    fullName: 'Luka Dončić',
    username: 'luka7doncic',
    position: 'Point Guard',
    playerNumber: 77,
    teamName: 'Dallas Mavericks',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    country: 'Slovenia',
    sport: 'basketball' as const,
    playerImage: require('../../../assets/MockData/MatchPage/marquinhos.png'),
    isVerified: true,
  },
];

/**
 * Team Search Results
 * Mock data for team search results
 */
export const mockTeams = [
  {
    id: 'team-1',
    teamName: 'Chelsea FC',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    sport: 'soccer' as const,
    location: 'London, England',
    memberCount: 28,
    isVerified: true,
  },
  {
    id: 'team-2',
    teamName: 'Paris Saint-Germain',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    sport: 'soccer' as const,
    location: 'Paris, France',
    memberCount: 30,
    isVerified: true,
  },
  {
    id: 'team-3',
    teamName: 'Real Madrid',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    sport: 'soccer' as const,
    location: 'Madrid, Spain',
    memberCount: 29,
    isVerified: true,
  },
  {
    id: 'team-4',
    teamName: 'FC Barcelona',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    sport: 'soccer' as const,
    location: 'Barcelona, Spain',
    memberCount: 27,
    isVerified: true,
  },
  {
    id: 'team-5',
    teamName: 'Manchester City',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    sport: 'soccer' as const,
    location: 'Manchester, England',
    memberCount: 26,
    isVerified: true,
  },
  {
    id: 'team-6',
    teamName: 'Los Angeles Lakers',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    sport: 'basketball' as const,
    location: 'Los Angeles, USA',
    memberCount: 15,
    isVerified: true,
  },
  {
    id: 'team-7',
    teamName: 'Golden State Warriors',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    sport: 'basketball' as const,
    location: 'San Francisco, USA',
    memberCount: 15,
    isVerified: true,
  },
  {
    id: 'team-8',
    teamName: 'Milwaukee Bucks',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    sport: 'basketball' as const,
    location: 'Milwaukee, USA',
    memberCount: 15,
    isVerified: true,
  },
  {
    id: 'team-9',
    teamName: 'Phoenix Suns',
    teamLogo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    sport: 'basketball' as const,
    location: 'Phoenix, USA',
    memberCount: 14,
    isVerified: false,
  },
  {
    id: 'team-10',
    teamName: 'Dallas Mavericks',
    teamLogo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    sport: 'basketball' as const,
    location: 'Dallas, USA',
    memberCount: 14,
    isVerified: false,
  },
];

/**
 * League Search Results
 * Mock data for league/tournament search results
 */
export const mockLeagues = [
  {
    id: 'league-1',
    leagueName: 'UEFA Champions League',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'soccer' as const,
    season: '2024/25',
    startDate: 'Sep 2024',
    endDate: 'May 2025',
    teamCount: 32,
  },
  {
    id: 'league-2',
    leagueName: 'English Premier League',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'soccer' as const,
    season: '2024/25',
    startDate: 'Aug 2024',
    endDate: 'May 2025',
    teamCount: 20,
  },
  {
    id: 'league-3',
    leagueName: 'La Liga',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'soccer' as const,
    season: '2024/25',
    startDate: 'Aug 2024',
    endDate: 'May 2025',
    teamCount: 20,
  },
  {
    id: 'league-4',
    leagueName: 'Ligue 1',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'soccer' as const,
    season: '2024/25',
    startDate: 'Aug 2024',
    endDate: 'May 2025',
    teamCount: 18,
  },
  {
    id: 'league-5',
    leagueName: 'Serie A',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'soccer' as const,
    season: '2024/25',
    startDate: 'Aug 2024',
    endDate: 'May 2025',
    teamCount: 20,
  },
  {
    id: 'league-6',
    leagueName: 'NBA',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'basketball' as const,
    season: '2024/25',
    startDate: 'Oct 2024',
    endDate: 'Jun 2025',
    teamCount: 30,
  },
  {
    id: 'league-7',
    leagueName: 'EuroLeague',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'basketball' as const,
    season: '2024/25',
    startDate: 'Oct 2024',
    endDate: 'May 2025',
    teamCount: 18,
  },
  {
    id: 'league-8',
    leagueName: 'NCAA Basketball',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo.png'),
    sport: 'basketball' as const,
    season: '2024/25',
    startDate: 'Nov 2024',
    endDate: 'Apr 2025',
    teamCount: 68,
  },
];

/**
 * Recent Searches
 * Mock data for user's recent search history
 */
export const mockRecentSearches = [
  'Cole Palmer',
  'Chelsea FC',
  'UEFA Champions League',
  'Kylian Mbappé',
  'Lakers',
];

/**
 * Trending Searches
 * Mock data for trending/popular searches
 */
export const mockTrendingSearches = [
  { id: 'trending-1', query: 'Lionel Messi', category: 'player' as const },
  { id: 'trending-2', query: 'Real Madrid', category: 'team' as const },
  { id: 'trending-3', query: 'NBA Finals', category: 'league' as const },
  { id: 'trending-4', query: 'LeBron James', category: 'player' as const },
  { id: 'trending-5', query: 'Premier League', category: 'league' as const },
];
