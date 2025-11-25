# AllGamesPage

The **AllGamesPage** displays all upcoming games/matches for the user.

## Overview

This page follows the same organizational structure as other screen sections (HomePage, MatchPage), with:
- Main orchestrator component (`MainAllGamesPage.tsx`)
- Mock data file (`mockData.ts`)
- Clean exports via `index.tsx`
- Documentation in `README.md`

## Page Structure

```
AllGamespage/
├── MainAllGamesPage.tsx      # Main page component
├── mockData.ts               # Games data
├── index.tsx                 # Exports
└── README.md                 # This documentation
```

## Features

- ✅ Lists all upcoming games for the user
- ✅ Shows total game count
- ✅ Navigation back to home
- ⏳ Games list display (coming soon)

## Usage

Navigate to this page from the HomePage by clicking on the "Upcoming Games" section header.

```tsx
// Navigation from HomePage
router.push('/all-games');
```

## Future Enhancements

- Full games list with cards
- Filter by date/league
- Search functionality
- Sort options
- Game status indicators

