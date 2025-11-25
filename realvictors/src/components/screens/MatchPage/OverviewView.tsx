/**
 * OverviewView Component
 *
 * Displays match statistics including:
 * Soccer: Possession, Shots, Passes, Fouls, Corners, etc.
 * Basketball: FG%, 3P%, FT%, Rebounds, Assists, Turnovers, etc.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';
import { YouTubePlayer } from '../../widgets/AppWide/YouTubePlayer';
import { MatchScoreHeader } from '../../widgets/MatchGame/MatchScoreHeader';
import { StatBar } from '../../widgets/MatchGame/StatBar';
import { BasketballMatchStatistics, MatchData, MatchStatistics } from './mockData';

interface OverviewViewProps {
  matchData: MatchData;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ matchData }) => {
  const { statistics, sport } = matchData;
  const isSoccer = sport === 'soccer';
  const isBasketball = sport === 'basketball';

  // Get team colors - use team's primaryColor if available, otherwise default to gold
  const homeTeamColor = matchData.homeTeam.primaryColor || COLORS.goldAccent;
  const awayTeamColor = matchData.awayTeam.primaryColor || COLORS.goldAccent;

  return (
    <View style={styles.container}>
      {/* Team Header */}
      <MatchScoreHeader
        homeTeam={{
          name: matchData.homeTeam.name,
          shortName: matchData.homeTeam.shortName,
          logo: matchData.homeTeam.logo,
          primaryColor: matchData.homeTeam.primaryColor,
        }}
        awayTeam={{
          name: matchData.awayTeam.name,
          shortName: matchData.awayTeam.shortName,
          logo: matchData.awayTeam.logo,
          primaryColor: matchData.awayTeam.primaryColor,
        }}
        homeScore={matchData.homeScore}
        awayScore={matchData.awayScore}
      />

      {/* YouTube Video Player - Only shows if videoUrl exists */}
      {matchData.videoUrl && (
        <View style={styles.videoContainer}>
          <YouTubePlayer videoUrl={matchData.videoUrl} />
        </View>
      )}

      {/* Statistics List - Conditional based on sport */}
      <View style={styles.statsContainer}>
        {isSoccer && (
          <>
            <StatBar
              title="Ball Possession"
              homeValue={(statistics as MatchStatistics).possession.home}
              awayValue={(statistics as MatchStatistics).possession.away}
              isPercentage={true}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Shot(s) on target"
              homeValue={(statistics as MatchStatistics).shotsOnTarget.home}
              awayValue={(statistics as MatchStatistics).shotsOnTarget.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Shot(s) off Target"
              homeValue={(statistics as MatchStatistics).shotsOffTarget.home}
              awayValue={(statistics as MatchStatistics).shotsOffTarget.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Corner Kick(s)"
              homeValue={(statistics as MatchStatistics).cornerKicks.home}
              awayValue={(statistics as MatchStatistics).cornerKicks.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Foul(s)"
              homeValue={(statistics as MatchStatistics).fouls.home}
              awayValue={(statistics as MatchStatistics).fouls.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Yellow Card(s)"
              homeValue={(statistics as MatchStatistics).yellowCards.home}
              awayValue={(statistics as MatchStatistics).yellowCards.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Throw in(s)"
              homeValue={(statistics as MatchStatistics).throwIns.home}
              awayValue={(statistics as MatchStatistics).throwIns.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Crosses"
              homeValue={(statistics as MatchStatistics).crosses.home}
              awayValue={(statistics as MatchStatistics).crosses.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Counter Attack(s)"
              homeValue={(statistics as MatchStatistics).counterAttacks.home}
              awayValue={(statistics as MatchStatistics).counterAttacks.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Goal Keeper Saves"
              homeValue={(statistics as MatchStatistics).goalkeeperSaves.home}
              awayValue={(statistics as MatchStatistics).goalkeeperSaves.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Goal kick(s)"
              homeValue={(statistics as MatchStatistics).goalKicks.home}
              awayValue={(statistics as MatchStatistics).goalKicks.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />
          </>
        )}

        {isBasketball && (
          <>
            <StatBar
              title="Field Goal %"
              homeValue={(statistics as BasketballMatchStatistics).fieldGoalPercentage.home}
              awayValue={(statistics as BasketballMatchStatistics).fieldGoalPercentage.away}
              isPercentage={true}
              homeAdditionalInfo={`(${(statistics as BasketballMatchStatistics).fieldGoalsMade.home}/${(statistics as BasketballMatchStatistics).fieldGoalsAttempted.home})`}
              awayAdditionalInfo={`(${(statistics as BasketballMatchStatistics).fieldGoalsMade.away}/${(statistics as BasketballMatchStatistics).fieldGoalsAttempted.away})`}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Three Point %"
              homeValue={(statistics as BasketballMatchStatistics).threePointPercentage.home}
              awayValue={(statistics as BasketballMatchStatistics).threePointPercentage.away}
              isPercentage={true}
              homeAdditionalInfo={`(${(statistics as BasketballMatchStatistics).threePointsMade.home}/${(statistics as BasketballMatchStatistics).threePointsAttempted.home})`}
              awayAdditionalInfo={`(${(statistics as BasketballMatchStatistics).threePointsMade.away}/${(statistics as BasketballMatchStatistics).threePointsAttempted.away})`}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Free Throw %"
              homeValue={(statistics as BasketballMatchStatistics).freeThrowPercentage.home}
              awayValue={(statistics as BasketballMatchStatistics).freeThrowPercentage.away}
              isPercentage={true}
              homeAdditionalInfo={`(${(statistics as BasketballMatchStatistics).freeThrowsMade.home}/${(statistics as BasketballMatchStatistics).freeThrowsAttempted.home})`}
              awayAdditionalInfo={`(${(statistics as BasketballMatchStatistics).freeThrowsMade.away}/${(statistics as BasketballMatchStatistics).freeThrowsAttempted.away})`}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Assists"
              homeValue={(statistics as BasketballMatchStatistics).assists.home}
              awayValue={(statistics as BasketballMatchStatistics).assists.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Turnovers"
              homeValue={(statistics as BasketballMatchStatistics).turnovers.home}
              awayValue={(statistics as BasketballMatchStatistics).turnovers.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Steals"
              homeValue={(statistics as BasketballMatchStatistics).steals.home}
              awayValue={(statistics as BasketballMatchStatistics).steals.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Blocks"
              homeValue={(statistics as BasketballMatchStatistics).blocks.home}
              awayValue={(statistics as BasketballMatchStatistics).blocks.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Rebounds"
              homeValue={(statistics as BasketballMatchStatistics).rebounds.home}
              awayValue={(statistics as BasketballMatchStatistics).rebounds.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Points in Paint"
              homeValue={(statistics as BasketballMatchStatistics).pointsInPaint.home}
              awayValue={(statistics as BasketballMatchStatistics).pointsInPaint.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />

            <StatBar
              title="Fast Break Points"
              homeValue={(statistics as BasketballMatchStatistics).fastBreakPoints.home}
              awayValue={(statistics as BasketballMatchStatistics).fastBreakPoints.away}
              homeTeamColor={homeTeamColor}
              awayTeamColor={awayTeamColor}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  videoContainer: {
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  statsContainer: {
    gap: 25,
    paddingHorizontal: 25,
    paddingTop: 42,
    paddingBottom: 70,
  },
});

