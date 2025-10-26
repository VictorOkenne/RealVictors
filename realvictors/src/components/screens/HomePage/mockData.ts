/**
 * Mock Data for HomePage
 * 
 * This file contains all the dummy/mock data used in the MainHomePage component.
 * 
 * Purpose:
 * - Keeps the MainHomePage component clean and focused on UI logic
 * - Makes it easy to remove or replace with real data from API/database
 * - Centralizes test data for development
 * 
 * To replace with real data:
 * 1. Create API service calls or database queries
 * 2. Replace imports in MainHomePage.tsx
 * 3. Delete this file when no longer needed
 */

/**
 * User Profile Data
 * Mock data for the current user's profile information
 * 
 * How it works:
 * - hasUploadedProfileImage: false = Shows default SVG silhouette
 * - hasUploadedProfileImage: true = Shows user's actual profile image
 * 
 * To test with uploaded image:
 * 1. Set hasUploadedProfileImage to true
 * 2. Add user's profile image to assets folder
 * 3. Update customProfileImage to point to that image
 */
export const userProfile = {
  hasUploadedProfileImage: false, // Set to true when user uploads their profile image
  // When user uploads their image, it would be stored here:
  customProfileImage: require('../../../assets/HomePage/Images/userSilhouetteDefault-2.png'),
};

/**
 * Season Statistics
 * Mock data for the user's season performance stats
 */
export const seasonStats = [
  { label: 'Points', value: '28' },
  { label: 'Rebound', value: '15' },
  { label: 'Wins', value: '20' },
  { label: 'Loss', value: '17' },
];

/**
 * Achievement Badges
 * Mock data for user achievements - only the numbers that change
 * 
 * Order: [Champions, Matches, Overall]
 * The widget handles the icons and labels internally
 */
export const achievements = [3, 5, 79];

/**
 * Upcoming Games
 * Mock data for scheduled games/matches
 * 
 * Note: Team logos still using Figma URLs - no matching local assets found
 * To replace: Add team logo PNG/SVG files to src/assets/HomePage/Images
 * Example: CFC-logo.png, PSG-logo.png
 */
export const upcomingGames = [
  {
    id: '1',
    leagueName: 'Inter state League',
    homeTeam: {
      name: 'CFC',
      logo: 'https://www.figma.com/api/mcp/asset/488f361d-6ffa-4179-a73d-168322e544e0',
    },
    awayTeam: {
      name: 'PSG',
      logo: 'https://www.figma.com/api/mcp/asset/adc69dbe-6a80-4904-b459-19d776498a0c',
    },
    time: '10:18pm',
    date: 'Dec 25th',
    location: 'Stadium road',
    variant: 'dark' as const,
  },
  {
    id: '2',
    leagueName: 'Inter state League',
    homeTeam: {
      name: 'CFC',
      logo: 'https://www.figma.com/api/mcp/asset/488f361d-6ffa-4179-a73d-168322e544e0',
    },
    awayTeam: {
      name: 'PSG',
      logo: 'https://www.figma.com/api/mcp/asset/adc69dbe-6a80-4904-b459-19d776498a0c',
    },
    time: '10:18pm',
    date: 'Dec 25th',
    location: 'Stadium road',
    variant: 'light' as const,
  },
  {
    id: '3',
    leagueName: 'Inter state League',
    homeTeam: {
      name: 'CFC',
      logo: 'https://www.figma.com/api/mcp/asset/488f361d-6ffa-4179-a73d-168322e544e0',
    },
    awayTeam: {
      name: 'PSG',
      logo: 'https://www.figma.com/api/mcp/asset/adc69dbe-6a80-4904-b459-19d776498a0c',
    },
    time: '10:18pm',
    date: 'Dec 25th',
    location: 'Stadium road',
    variant: 'light' as const,
  },
];

/**
 * Social Posts
 * Mock data for social media posts and highlights
 */
export const socialPosts = [
  {
    id: '1',
    user: {
      name: 'Michael Huston',
      initials: 'M',
      avatarColor: '#0BA912',
    },
    timeAgo: 'Just now',
    images: [
      'https://www.figma.com/api/mcp/asset/2d86aa14-92c9-4e97-849a-ee6465c88ab4',
      'https://www.figma.com/api/mcp/asset/2ff18402-6165-4872-a92c-0c76213b2da3',
      'https://www.figma.com/api/mcp/asset/7e09e17b-6f9c-4e2d-a8a0-632171b98857',
    ],
    caption: "Nothing better than watching my son play, This kid is going to be champions one day, I just know it ❤️",
    hashtags: "#Football #Soccer #RealVictors #Footballacademy #academy",
    likes: '177.5k',
    comments: '2.5k',
  },
  {
    id: '2',
    user: {
      name: 'Michael Huston',
      initials: 'M',
      avatarColor: '#0BA912',
    },
    timeAgo: 'Just now',
    images: [
      'https://www.figma.com/api/mcp/asset/2d86aa14-92c9-4e97-849a-ee6465c88ab4',
    ],
    caption: "Nothing better than watching my son play, This kid is going to be champions one day, I just know it ❤️",
    hashtags: "#Football #Soccer #RealVictors #Footballacademy #academy",
    likes: '177.5k',
    comments: '2.5k',
  },
  {
    id: '3',
    user: {
      name: 'John Huston',
      initials: 'J',
      avatarColor: '#A90B75',
    },
    timeAgo: '2h ago',
    images: [],
    caption: "Nothing better than watching my son play, This kid is going to be champions one day, I just know it ❤️",
    hashtags: "#Football #Soccer #RealVictors #Footballacademy #academy",
    likes: '177.5k',
    comments: '2.5k',
  },
  {
    id: '4',
    user: {
      name: 'Oliver Samson',
      initials: 'O',
      avatarColor: '#000862',
    },
    timeAgo: 'Just now',
    images: [],
    caption: "Nothing better than watching my son play, This kid is going to be champions one day, I just know it ❤️",
    hashtags: "#Football #Soccer #RealVictors #Footballacademy #academy",
    likes: '177.5k',
    comments: '2.5k',
  },
];

/**
 * Highlight Filter Tabs
 * Mock data for the highlights section tab filters
 */
export const highlightTabs = ['All', 'Soccer', 'Basketball'];

/**
 * Friends Data
 * Mock data for friends list in share modal
 * 
 * Structure:
 * - id: Unique identifier for the friend
 * - username: Friend's username (with @ symbol)
 * - initials: First letter(s) of name for avatar
 * - avatarColor: Background color for avatar circle
 */
export const friendsList = [
  {
    id: 'friend-1',
    username: '@Samuel',
    initials: 'U',
    avatarColor: '#0BA912',
  },
  {
    id: 'friend-2',
    username: '@MrAceil',
    initials: 'M',
    avatarColor: '#000862',
  },
  {
    id: 'friend-3',
    username: '@Getthewin',
    initials: 'G',
    avatarColor: '#827F7F',
  },
  {
    id: 'friend-4',
    username: '@JohnDoe',
    initials: 'J',
    avatarColor: '#A90B75',
  },
  {
    id: 'friend-5',
    username: '@SarahK',
    initials: 'S',
    avatarColor: '#0BA4A9',
  },
  {
    id: 'friend-6',
    username: '@MikeT',
    initials: 'M',
    avatarColor: '#A97F0B',
  },
  {
    id: 'friend-7',
    username: '@EmilyR',
    initials: 'E',
    avatarColor: '#5A0BA9',
  },
  {
    id: 'friend-8',
    username: '@DavidC',
    initials: 'D',
    avatarColor: '#0B5AA9',
  },
  {
    id: 'friend-9',
    username: '@LisaP',
    initials: 'L',
    avatarColor: '#0BA970',
  },
  {
    id: 'friend-10',
    username: '@AlexR',
    initials: 'A',
    avatarColor: '#B50BA9',
  },
];

/**
 * Comments Data
 * Mock data for comments in social posts
 * 
 * Structure matches CommentData interface in CommentsModal
 * Each comment has user info, timestamp, text, likes, and optional replies count
 */
export const commentsData: { [postId: string]: any[] } = {
  '1': [
    {
      id: 'comment-1-1',
      user: {
        name: 'Uju Samuel',
        initials: 'U',
        avatarColor: '#0BA912',
      },
      timeAgo: '3h',
      text: "Went to my kid's football match, i felt so proud watching him play.",
      likes: '9.5k',
      repliesCount: 15,
    },
    {
      id: 'comment-1-2',
      user: {
        name: 'John Austin',
        initials: 'J',
        avatarColor: '#000862',
      },
      timeAgo: '1h',
      text: "Young talent right there!❤️‍🔥 The kid's got great control on the ball",
      likes: '200',
      repliesCount: 15,
    },
    {
      id: 'comment-1-3',
      user: {
        name: 'Sam Pocket',
        initials: 'S',
        avatarColor: '#0BA4A9',
      },
      timeAgo: '1h',
      text: "Wow, your boy's footwork is insane for his age, Future stars in the making",
      likes: '200',
      repliesCount: 15,
    },
    {
      id: 'comment-1-4',
      user: {
        name: 'Jason Realmon',
        initials: 'J',
        avatarColor: '#A97F0B',
      },
      timeAgo: '1h',
      text: 'Love to see young athlethes putting in the work early. Keep pushing him.',
      likes: '200',
      repliesCount: 15,
    },
    {
      id: 'comment-1-5',
      user: {
        name: 'Maya Johnson',
        initials: 'M',
        avatarColor: '#A90B75',
      },
      timeAgo: '45m',
      text: 'Such dedication at such a young age! This is inspiring to watch. Keep it up! 🔥',
      likes: '145',
      repliesCount: 8,
    },
    {
      id: 'comment-1-6',
      user: {
        name: 'David Chen',
        initials: 'D',
        avatarColor: '#0B5AA9',
      },
      timeAgo: '30m',
      text: 'The future of football right here! Amazing skills and technique.',
      likes: '89',
      repliesCount: 3,
    },
  ],
  '2': [
    {
      id: 'comment-2-1',
      user: {
        name: 'Sarah Williams',
        initials: 'S',
        avatarColor: '#B50BA9',
      },
      timeAgo: '2h',
      text: 'This is absolutely beautiful! The passion and dedication shows.',
      likes: '1.2k',
      repliesCount: 23,
    },
    {
      id: 'comment-2-2',
      user: {
        name: 'Mike Thompson',
        initials: 'M',
        avatarColor: '#0BA950',
      },
      timeAgo: '1h',
      text: 'Incredible talent! Keep nurturing this gift.',
      likes: '456',
      repliesCount: 12,
    },
  ],
  '3': [
    {
      id: 'comment-3-1',
      user: {
        name: 'Emma Davis',
        initials: 'E',
        avatarColor: '#A9500B',
      },
      timeAgo: '4h',
      text: 'So proud to see young athletes working hard! This is the spirit we need.',
      likes: '789',
      repliesCount: 18,
    },
  ],
  '4': [
    {
      id: 'comment-4-1',
      user: {
        name: 'Alex Rodriguez',
        initials: 'A',
        avatarColor: '#5A0BA9',
      },
      timeAgo: '3h',
      text: 'This level of commitment is what champions are made of! 🏆',
      likes: '2.1k',
      repliesCount: 31,
    },
    {
      id: 'comment-4-2',
      user: {
        name: 'Lisa Park',
        initials: 'L',
        avatarColor: '#0BA970',
      },
      timeAgo: '2h',
      text: 'Amazing work ethic! The future is bright for this young athlete.',
      likes: '567',
      repliesCount: 9,
    },
  ],
};

