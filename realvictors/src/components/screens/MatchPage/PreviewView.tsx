/**
 * PreviewView Component
 *
 * Displays match preview information for upcoming games including:
 * - Venue information
 * - Weather conditions
 * - Referee details
 * - Recent form (last 5 games)
 * - Form comparison
 * - Current momentum
 * - Injuries and suspensions
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import { MatchData } from './mockData';

interface PreviewViewProps {
  matchData: MatchData;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ matchData }) => {
  const { venueInfo, weather, referee, injuries, suspensions, homeTeam, awayTeam, homeForm, awayForm, status } = matchData;

  // Determine if this is a past or upcoming game
  const isPastGame = status === 'finished';

  // Calculate form stats
  const calculateFormStats = (form: typeof homeForm) => {
    const wins = form.filter(f => f.result === 'W').length;
    const draws = form.filter(f => f.result === 'D').length;
    const losses = form.filter(f => f.result === 'L').length;

    return { wins, draws, losses };
  };

  const homeStats = calculateFormStats(homeForm);
  const awayStats = calculateFormStats(awayForm);

  // Get form color based on FormBadge colors
  const getFormColor = (result: string) => {
    switch (result) {
      case 'W':
        return '#F8C300'; // Gold
      case 'D':
        return 'rgba(174, 174, 174, 0.72)'; // Gray
      case 'L':
        return COLORS.black; // Black
      default:
        return COLORS.gray400;
    }
  };

  const getFormTextColor = (result: string) => {
    switch (result) {
      case 'W':
        return COLORS.black;
      case 'D':
        return COLORS.white;
      case 'L':
        return COLORS.white;
      default:
        return COLORS.black;
    }
  };

  const renderFormIndicator = (result: string) => {
    const bgColor = getFormColor(result);
    const textColor = getFormTextColor(result);
    return (
      <View style={[
        styles.formDot,
        {
          backgroundColor: bgColor,
          // Add white border for loss badges
          ...(result === 'L' && {
            borderWidth: 1,
            borderColor: COLORS.white,
          }),
        }
      ]}>
        <Text style={[styles.formLetter, { color: textColor }]}>{result}</Text>
      </View>
    );
  };

  // Render section title with gold accent line
  const renderSectionTitle = (title: string) => (
    <View style={styles.titleContainer}>
      <View style={styles.accentLine} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Venue & Match Info Section */}
      {venueInfo && (
        <View style={styles.section}>
          {renderSectionTitle('Match Information')}
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Venue</Text>
              <Text style={styles.infoValue}>{venueInfo.name}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>City</Text>
              <Text style={styles.infoValue}>{venueInfo.city}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Capacity</Text>
              <Text style={styles.infoValue}>{venueInfo.capacity.toLocaleString()}</Text>
            </View>
            {venueInfo.surface && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Surface</Text>
                  <Text style={styles.infoValue}>{venueInfo.surface}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      )}

      {/* Weather/Venue Type Section */}
      {(weather || (venueInfo && venueInfo.isIndoor)) && (
        <View style={styles.section}>
          {renderSectionTitle(isPastGame ? 'Weather Conditions' : 'Expected Conditions')}
          <View style={styles.card}>
            {venueInfo?.isIndoor ? (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Venue Type</Text>
                <Text style={styles.infoValue}>Indoor</Text>
              </View>
            ) : weather ? (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Weather</Text>
                  <Text style={styles.infoValue}>{weather.condition}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Temperature</Text>
                  <Text style={styles.infoValue}>{weather.temperature}</Text>
                </View>
              </>
            ) : null}
          </View>
        </View>
      )}

      {/* Referee Section */}
      {referee && (
        <View style={styles.section}>
          {renderSectionTitle('Match Officials')}
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Referee</Text>
              <Text style={styles.infoValue}>{referee.name}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nationality</Text>
              <Text style={styles.infoValue}>{referee.nationality}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Injuries & Suspensions Section */}
      {(injuries || suspensions) && (
        <View style={styles.section}>
          {renderSectionTitle('Squad Status')}

          {/* Home Team */}
          <View style={styles.squadStatusCard}>
            <View style={styles.teamNewsHeader}>
              <Image source={homeTeam.logo} style={styles.teamLogo} />
              <Text style={styles.teamName}>{homeTeam.name}</Text>
            </View>

            {/* Injuries */}
            {injuries && injuries.home.length > 0 && (
              <View style={styles.statusGroup}>
                <Text style={styles.statusGroupTitle}>Injuries</Text>
                {injuries.home.map((injury, index) => (
                  <View key={index} style={styles.statusItem}>
                    <Text style={styles.playerName}>{injury.player}</Text>
                    <View style={styles.statusDetails}>
                      <Text style={styles.statusInjury}>{injury.injury}</Text>
                      <Text style={[
                        styles.statusBadge,
                        injury.status === 'Out' ? styles.statusOut : styles.statusDoubtful
                      ]}>
                        {injury.status}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Suspensions */}
            {suspensions && suspensions.home.length > 0 && (
              <View style={[styles.statusGroup, { marginTop: 16 }]}>
                <Text style={styles.statusGroupTitle}>Suspensions</Text>
                {suspensions.home.map((suspension, index) => (
                  <View key={index} style={styles.statusItem}>
                    <Text style={styles.playerName}>{suspension.player}</Text>
                    <Text style={styles.statusReason}>{suspension.reason}</Text>
                  </View>
                ))}
              </View>
            )}

            {injuries && injuries.home.length === 0 && suspensions && suspensions.home.length === 0 && (
              <Text style={styles.noIssuesText}>No injuries or suspensions</Text>
            )}
          </View>

          {/* Away Team */}
          <View style={[styles.squadStatusCard, { marginTop: 16 }]}>
            <View style={styles.teamNewsHeader}>
              <Image source={awayTeam.logo} style={styles.teamLogo} />
              <Text style={styles.teamName}>{awayTeam.name}</Text>
            </View>

            {/* Injuries */}
            {injuries && injuries.away.length > 0 && (
              <View style={styles.statusGroup}>
                <Text style={styles.statusGroupTitle}>Injuries</Text>
                {injuries.away.map((injury, index) => (
                  <View key={index} style={styles.statusItem}>
                    <Text style={styles.playerName}>{injury.player}</Text>
                    <View style={styles.statusDetails}>
                      <Text style={styles.statusInjury}>{injury.injury}</Text>
                      <Text style={[
                        styles.statusBadge,
                        injury.status === 'Out' ? styles.statusOut : styles.statusDoubtful
                      ]}>
                        {injury.status}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Suspensions */}
            {suspensions && suspensions.away.length > 0 && (
              <View style={[styles.statusGroup, { marginTop: 16 }]}>
                <Text style={styles.statusGroupTitle}>Suspensions</Text>
                {suspensions.away.map((suspension, index) => (
                  <View key={index} style={styles.statusItem}>
                    <Text style={styles.playerName}>{suspension.player}</Text>
                    <Text style={styles.statusReason}>{suspension.reason}</Text>
                  </View>
                ))}
              </View>
            )}

            {injuries && injuries.away.length === 0 && suspensions && suspensions.away.length === 0 && (
              <Text style={styles.noIssuesText}>No injuries or suspensions</Text>
            )}
          </View>
        </View>
      )}

      {/* Recent Form Section */}
      <View style={styles.section}>
        {renderSectionTitle('Recent Form (Last 5 Games)')}

        {/* Home Team */}
        <View style={styles.teamFormCard}>
          <View style={styles.teamHeader}>
            <Image source={homeTeam.logo} style={styles.teamLogo} />
            <Text style={styles.teamName}>{homeTeam.name}</Text>
          </View>

          <View style={styles.formRow}>
            {homeForm.map((form, index) => (
              <View key={index} style={styles.formItemContainer}>
                {renderFormIndicator(form.result)}
                <Text style={styles.formOpponent}>{form.opponent}</Text>
                <Text style={styles.formScore}>{form.score}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{homeStats.wins}</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{homeStats.draws}</Text>
              <Text style={styles.statLabel}>Draws</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{homeStats.losses}</Text>
              <Text style={styles.statLabel}>Losses</Text>
            </View>
          </View>
        </View>

        {/* Away Team */}
        <View style={[styles.teamFormCard, { marginTop: 20 }]}>
          <View style={styles.teamHeader}>
            <Image source={awayTeam.logo} style={styles.teamLogo} />
            <Text style={styles.teamName}>{awayTeam.name}</Text>
          </View>

          <View style={styles.formRow}>
            {awayForm.map((form, index) => (
              <View key={index} style={styles.formItemContainer}>
                {renderFormIndicator(form.result)}
                <Text style={styles.formOpponent}>{form.opponent}</Text>
                <Text style={styles.formScore}>{form.score}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{awayStats.wins}</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{awayStats.draws}</Text>
              <Text style={styles.statLabel}>Draws</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{awayStats.losses}</Text>
              <Text style={styles.statLabel}>Losses</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Form Comparison */}
      <View style={styles.section}>
        {renderSectionTitle('Form Comparison')}
        <View style={styles.comparisonCard}>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonTeam}>
              <Image source={homeTeam.logo} style={styles.comparisonLogo} />
              <Text style={styles.comparisonTeamName}>{homeTeam.shortName}</Text>
            </View>

            <View style={styles.comparisonStat}>
              <Text style={styles.comparisonLabel}>Win Rate</Text>
              <View style={styles.comparisonValues}>
                <Text style={styles.comparisonValue}>{((homeStats.wins / 5) * 100).toFixed(0)}%</Text>
                <View style={styles.comparisonSeparator} />
                <Text style={styles.comparisonValue}>{((awayStats.wins / 5) * 100).toFixed(0)}%</Text>
              </View>
            </View>

            <View style={styles.comparisonTeam}>
              <Image source={awayTeam.logo} style={styles.comparisonLogo} />
              <Text style={styles.comparisonTeamName}>{awayTeam.shortName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonTeam} />

            <View style={styles.comparisonStat}>
              <Text style={styles.comparisonLabel}>Goals Scored</Text>
              <View style={styles.comparisonValues}>
                <Text style={styles.comparisonValue}>
                  {homeForm.reduce((sum, f) => sum + parseInt(f.score.split('-')[0]), 0)}
                </Text>
                <View style={styles.comparisonSeparator} />
                <Text style={styles.comparisonValue}>
                  {awayForm.reduce((sum, f) => sum + parseInt(f.score.split('-')[0]), 0)}
                </Text>
              </View>
            </View>

            <View style={styles.comparisonTeam} />
          </View>

          <View style={styles.divider} />

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonTeam} />

            <View style={styles.comparisonStat}>
              <Text style={styles.comparisonLabel}>Goals Conceded</Text>
              <View style={styles.comparisonValues}>
                <Text style={styles.comparisonValue}>
                  {homeForm.reduce((sum, f) => sum + parseInt(f.score.split('-')[1]), 0)}
                </Text>
                <View style={styles.comparisonSeparator} />
                <Text style={styles.comparisonValue}>
                  {awayForm.reduce((sum, f) => sum + parseInt(f.score.split('-')[1]), 0)}
                </Text>
              </View>
            </View>

            <View style={styles.comparisonTeam} />
          </View>
        </View>
      </View>

      {/* Current Momentum */}
      <View style={styles.section}>
        {renderSectionTitle('Current Momentum')}
        <View style={styles.momentumCard}>
          <View style={styles.momentumRow}>
            <View style={styles.momentumTeam}>
              <Image source={homeTeam.logo} style={styles.teamLogo} />
              <Text style={styles.teamName}>{homeTeam.shortName}</Text>
            </View>
            <View style={[
              styles.momentumIndicator,
              { backgroundColor: homeStats.wins >= 3 ? '#F8C300' : homeStats.wins >= 2 ? 'rgba(174, 174, 174, 0.72)' : COLORS.black }
            ]}>
              <Text style={[
                styles.momentumText,
                { color: homeStats.wins >= 3 ? COLORS.black : COLORS.white }
              ]}>
                {homeStats.wins >= 3 ? 'Excellent' : homeStats.wins >= 2 ? 'Good' : 'Poor'}
              </Text>
            </View>
          </View>

          <View style={[styles.momentumRow, { marginTop: 16 }]}>
            <View style={styles.momentumTeam}>
              <Image source={awayTeam.logo} style={styles.teamLogo} />
              <Text style={styles.teamName}>{awayTeam.shortName}</Text>
            </View>
            <View style={[
              styles.momentumIndicator,
              { backgroundColor: awayStats.wins >= 3 ? '#F8C300' : awayStats.wins >= 2 ? 'rgba(174, 174, 174, 0.72)' : COLORS.black }
            ]}>
              <Text style={[
                styles.momentumText,
                { color: awayStats.wins >= 3 ? COLORS.black : COLORS.white }
              ]}>
                {awayStats.wins >= 3 ? 'Excellent' : awayStats.wins >= 2 ? 'Good' : 'Poor'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    lineHeight: 24, // Match the accent line height for proper vertical alignment
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.gray500,
  },
  infoValue: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  // Team form styles
  teamFormCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.black,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  formItemContainer: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  formDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formLetter: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.md,
  },
  formOpponent: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  formScore: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.black,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.gray200,
  },
  // Form comparison styles
  comparisonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  comparisonTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  comparisonLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  comparisonTeamName: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },
  comparisonStat: {
    flex: 2,
    alignItems: 'center',
  },
  comparisonLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
    marginBottom: 8,
  },
  comparisonValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  comparisonValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.black,
  },
  comparisonSeparator: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.gray300,
  },
  // Momentum styles
  momentumCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  momentumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  momentumTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  momentumIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  momentumText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  // Squad status styles
  squadStatusCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  teamNewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  statusGroup: {
    marginTop: 8,
  },
  statusGroupTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  statusItem: {
    marginBottom: 12,
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.black,
    marginBottom: 4,
  },
  statusDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusInjury: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
  },
  statusBadge: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusOut: {
    backgroundColor: '#FFE5E5',
    color: '#D32F2F',
  },
  statusDoubtful: {
    backgroundColor: '#FFF4E5',
    color: '#F57C00',
  },
  statusReason: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
  },
  noIssuesText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.gray400,
    textAlign: 'center',
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: '#F8C300',
  },
});
