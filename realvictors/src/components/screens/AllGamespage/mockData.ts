/**
 * Mock Data for AllGamesPage
 *
 * This file contains all the dummy/mock data used in the MainAllGamesPage component.
 * Includes all upcoming games and previous games for the user.
 */

/**
 * All Upcoming Games
 * Extended list of all upcoming games for the user
 * sortDate is used for proper sorting (soonest first)
 */
export const upcomingGames = [
  {
    id: '1',
    leagueName: 'Inter state League',
    tournament: 'UEFA Champions League',
    sport: 'soccer' as const,
    userTeam: 'Real Madrid', // Team the user plays for
    homeTeam: {
      name: 'Real Madrid',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'F.C. Barcelona',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    time: '10:15pm',
    date: 'Dec 29th',
    location: 'Old Trafford',
    matchStage: 'Group H',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo2.png'),
    sortDate: new Date('2025-12-29').getTime(),
  },
  {
    id: '2',
    leagueName: 'Inter state League',
    tournament: 'Premier League',
    sport: 'soccer' as const,
    userTeam: 'CFC',
    homeTeam: {
      name: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'PSG',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    time: '10:15pm',
    date: 'Dec 26th',
    location: 'Stadium road',
    matchStage: 'Knockout',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo2.png'),
    sortDate: new Date('2025-12-26').getTime(),
  },
  {
    id: '3',
    leagueName: 'Inter state League',
    tournament: 'NBA Finals',
    sport: 'basketball' as const,
    userTeam: 'Lakers',
    homeTeam: {
      name: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'PSG',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    time: '10:15pm',
    date: 'Jan 5th',
    location: 'Stadium road',
    matchStage: 'Week 5',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo2.png'),
    sortDate: new Date('2026-01-05').getTime(),
  },
];

/**
 * All Previous Games
 * List of all completed games with scores
 * sortDate is used for proper sorting (most recent first)
 */
export const previousGames = [
  {
    id: 'prev-1',
    leagueName: 'Inter state League',
    tournament: 'Premier League',
    sport: 'soccer' as const,
    userTeam: 'CFC',
    result: 'draw' as const, // win, loss, or draw
    homeTeam: {
      name: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'RLM',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    time: '10:15pm',
    date: 'Dec 20th',
    location: 'Stadium road',
    matchStage: 'Match day 15',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo2.png'),
    score: {
      home: 2,
      away: 2,
    },
    sortDate: new Date('2024-12-20').getTime(),
  },
  {
    id: 'prev-2',
    leagueName: 'Inter state League',
    tournament: 'UEFA Champions League',
    sport: 'soccer' as const,
    userTeam: 'CFC',
    result: 'win' as const,
    homeTeam: {
      name: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'RLM',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    time: '3:00pm',
    date: 'Dec 18th',
    location: 'Stadium road',
    matchStage: 'Quarter Final',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo2.png'),
    score: {
      home: 3,
      away: 2,
    },
    sortDate: new Date('2024-12-18').getTime(),
  },
  {
    id: 'prev-3',
    leagueName: 'Inter state League',
    tournament: 'NBA Playoffs',
    sport: 'basketball' as const,
    userTeam: 'Lakers',
    result: 'draw' as const,
    homeTeam: {
      name: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'RLM',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    time: '7:30pm',
    date: 'Dec 15th',
    location: 'Stadium road',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo2.png'),
    score: {
      home: 0,
      away: 0,
    },
    sortDate: new Date('2024-12-15').getTime(),
  },
  {
    id: 'prev-4',
    leagueName: 'Inter state League',
    tournament: 'Premier League',
    sport: 'soccer' as const,
    userTeam: 'Real Madrid',
    result: 'loss' as const,
    homeTeam: {
      name: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'RLM',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    time: '5:45pm',
    date: 'Dec 12th',
    location: 'Stadium road',
    leagueLogo: require('../../../assets/MockData/MatchPage/uclLogo2.png'),
    score: {
      home: 1,
      away: 1,
    },
    sortDate: new Date('2024-12-12').getTime(),
  },
];

