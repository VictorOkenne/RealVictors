/**
 * TournamentBracket Component - Clean Bracket Design
 *
 * Professional tournament bracket with proper connecting lines
 * Inspired by March Madness and other professional brackets
 *
 * Features:
 * - Horizontal scrolling through rounds
 * - Clean connecting lines showing match progression
 * - Round selector for quick navigation
 * - Proper vertical spacing
 */

import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { KnockoutStage, TournamentMatch } from '../../screens/TeamProfilePage/mockData';
import { TournamentMatchCard } from './TournamentMatchCard';
import { MatchDetailsModal } from './MatchDetailsModal';

interface TournamentBracketProps {
  knockoutStage: KnockoutStage;
  highlightedTeam?: string;
  onMatchPress?: (matchId: string) => void;
}

// Layout constants - adjusted for smaller match cards
const MATCH_CARD_HEIGHT = 90; // Height of match card (2 teams @ 44px each + divider + padding)
const MATCH_SPACING = 80; // Large space between matches to prevent overlap in R16
const ROUND_WIDTH = 200; // Width matches new card width
const CONNECTOR_WIDTH = 60; // Width of connecting line area
const ROUND_PADDING = 20; // Padding around rounds

export const TournamentBracket: React.FC<TournamentBracketProps> = ({
  knockoutStage,
  highlightedTeam,
  onMatchPress,
}) => {
  const sortedRounds = [...knockoutStage.rounds].sort((a, b) => a.roundOrder - b.roundOrder);
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const roundSelectorRef = useRef<ScrollView>(null);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch | null>(null);

  /**
   * Handle match card press - open modal for multi-game matches
   */
  const handleMatchPress = (matchId: string) => {
    // Find the match in all rounds
    const match = sortedRounds
      .flatMap((round) => round.matches)
      .find((m) => m.matchId === matchId);

    if (match && (match.matchType === 'two-leg' || match.matchType === 'series')) {
      setSelectedMatch(match);
      setModalVisible(true);
    }

    // Also call the parent's onMatchPress if provided
    onMatchPress?.(matchId);
  };

  /**
   * Handle game press from modal - navigate to match details
   */
  const handleGamePress = (matchId: string, gameId?: string) => {
    // Close modal
    setModalVisible(false);
    setSelectedMatch(null);

    // Call parent handler to navigate to match page
    onMatchPress?.(matchId);
    // In a real app, you'd navigate to the specific game/leg page here
    console.log('Navigate to match:', matchId, 'game:', gameId);
  };

  /**
   * Close modal
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMatch(null);
  };

  /**
   * Get X position for a specific round
   */
  const getRoundXPosition = (roundIndex: number): number => {
    // Each round takes up: ROUND_WIDTH + CONNECTOR_WIDTH
    // (The ROUND_PADDING is already inside the ROUND_WIDTH)
    // Simply multiply by round index to get position
    return roundIndex * (ROUND_WIDTH + CONNECTOR_WIDTH);
  };

  /**
   * Scroll round selector to show the selected button
   */
  const scrollRoundSelectorToIndex = (index: number) => {
    // Approximate button width (minWidth 80 + padding 28 + margin 8 = ~116px)
    const buttonWidth = 116;
    const xPosition = index * buttonWidth - 40; // Center the button with some offset
    roundSelectorRef.current?.scrollTo({ x: Math.max(0, xPosition), animated: true });
  };

  /**
   * Scroll to selected round with proper alignment
   */
  const scrollToRound = (roundIndex: number) => {
    setSelectedRoundIndex(roundIndex);
    const xPosition = getRoundXPosition(roundIndex);
    scrollViewRef.current?.scrollTo({ x: xPosition, animated: true });
    scrollRoundSelectorToIndex(roundIndex);
  };

  /**
   * Handle manual scroll - update selected round based on scroll position
   */
  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;

    // Determine which round is currently most visible
    let closestRoundIndex = 0;
    let smallestDistance = Math.abs(scrollX - getRoundXPosition(0));

    for (let i = 1; i < sortedRounds.length; i++) {
      const roundX = getRoundXPosition(i);
      const distance = Math.abs(scrollX - roundX);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestRoundIndex = i;
      }
    }

    // Only update if different to avoid unnecessary re-renders
    if (closestRoundIndex !== selectedRoundIndex) {
      setSelectedRoundIndex(closestRoundIndex);
      scrollRoundSelectorToIndex(closestRoundIndex);
    }
  };

  /**
   * Calculate vertical position for a match
   * Each successive round doubles the spacing between matches
   */
  const getMatchPosition = (roundIndex: number, matchIndex: number): number => {
    if (roundIndex === 0) {
      // First round: matches are evenly spaced
      return matchIndex * (MATCH_CARD_HEIGHT + MATCH_SPACING);
    }

    // Later rounds: spacing doubles each round to align with connecting lines
    const spacingMultiplier = Math.pow(2, roundIndex);
    const baseSpacing = MATCH_CARD_HEIGHT + MATCH_SPACING;
    return matchIndex * baseSpacing * spacingMultiplier + (baseSpacing * (spacingMultiplier - 1)) / 2;
  };

  /**
   * Get center Y position of a match (for connecting lines)
   */
  const getMatchCenter = (roundIndex: number, matchIndex: number): number => {
    return getMatchPosition(roundIndex, matchIndex) + MATCH_CARD_HEIGHT / 2;
  };

  /**
   * Render connecting lines between rounds
   */
  const renderConnectors = (
    currentRoundIndex: number,
    currentRound: typeof sortedRounds[0],
    nextRound: typeof sortedRounds[0],
  ) => {
    const nextRoundIndex = currentRoundIndex + 1;
    const lines = [];

    // Each match in next round connects to 2 matches in current round
    for (let i = 0; i < nextRound.matches.length; i++) {
      const match1Index = i * 2;
      const match2Index = i * 2 + 1;

      // Only render if both source matches exist
      if (match1Index < currentRound.matches.length && match2Index < currentRound.matches.length) {
        const match1CenterY = getMatchCenter(currentRoundIndex, match1Index);
        const match2CenterY = getMatchCenter(currentRoundIndex, match2Index);
        const nextMatchCenterY = getMatchCenter(nextRoundIndex, i);

        lines.push(
          <View key={`connector-${i}`} style={styles.connectorGroup}>
            {/* Line from match 1 to center point */}
            <View
              style={[
                styles.horizontalLineLeft,
                {
                  top: match1CenterY,
                  left: 0,
                  width: CONNECTOR_WIDTH / 2,
                },
              ]}
            />

            {/* Line from match 2 to center point */}
            <View
              style={[
                styles.horizontalLineLeft,
                {
                  top: match2CenterY,
                  left: 0,
                  width: CONNECTOR_WIDTH / 2,
                },
              ]}
            />

            {/* Vertical line connecting the two */}
            <View
              style={[
                styles.verticalLine,
                {
                  top: match1CenterY,
                  left: CONNECTOR_WIDTH / 2 - 1,
                  height: match2CenterY - match1CenterY,
                },
              ]}
            />

            {/* Line from center point to next match */}
            <View
              style={[
                styles.horizontalLineRight,
                {
                  top: nextMatchCenterY,
                  left: CONNECTOR_WIDTH / 2,
                  width: CONNECTOR_WIDTH / 2,
                },
              ]}
            />
          </View>,
        );
      }
    }

    return <View style={styles.connectorsContainer}>{lines}</View>;
  };

  /**
   * Calculate minimum height needed for bracket
   */
  const getBracketHeight = (): number => {
    if (sortedRounds.length === 0) return 600;

    // Use the first round (most matches) to determine height
    const firstRound = sortedRounds[0];
    const lastMatchIndex = firstRound.matches.length - 1;
    const lastMatchBottom = getMatchPosition(0, lastMatchIndex) + MATCH_CARD_HEIGHT;

    return Math.max(600, lastMatchBottom + 100); // Add padding at bottom
  };

  return (
    <View style={styles.container}>
      {/* Round Selector */}
      <ScrollView
        ref={roundSelectorRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.roundSelector}
        contentContainerStyle={styles.roundSelectorContent}
      >
        {sortedRounds.map((round, index) => (
          <TouchableOpacity
            key={round.roundId}
            style={[styles.roundButton, selectedRoundIndex === index && styles.roundButtonActive]}
            onPress={() => scrollToRound(index)}
          >
            <Text
              style={[
                styles.roundButtonText,
                selectedRoundIndex === index && styles.roundButtonTextActive,
              ]}
            >
              {round.roundName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Horizontal Scrollable Bracket */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bracketScroll}
        contentContainerStyle={[styles.bracketContent, { minHeight: getBracketHeight() }]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {sortedRounds.map((round, roundIndex) => (
          <View key={round.roundId} style={styles.roundWrapper}>
            {/* Round Column */}
            <View style={[styles.roundColumn, { width: ROUND_WIDTH }]}>
              {/* Round Label */}
              <View style={styles.roundLabel}>
                <Text style={styles.roundLabelText}>{round.roundName}</Text>
              </View>

              {/* Matches */}
              {round.matches.map((match, matchIndex) => {
                const topPosition = getMatchPosition(roundIndex, matchIndex);

                return (
                  <View
                    key={match.matchId}
                    style={[
                      styles.matchContainer,
                      {
                        position: 'absolute',
                        top: topPosition,
                        left: 0,
                        right: 0,
                      },
                    ]}
                  >
                    <TournamentMatchCard
                      match={match}
                      highlightedTeam={highlightedTeam}
                      onMatchPress={handleMatchPress}
                    />
                  </View>
                );
              })}
            </View>

            {/* Connector Lines to Next Round */}
            {roundIndex < sortedRounds.length - 1 && (
              <View style={[styles.connectorColumn, { width: CONNECTOR_WIDTH }]}>
                {renderConnectors(roundIndex, round, sortedRounds[roundIndex + 1])}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Match Details Modal */}
      <MatchDetailsModal
        visible={modalVisible}
        match={selectedMatch}
        onClose={handleCloseModal}
        onGamePress={handleGamePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Round Selector
  roundSelector: {
    marginBottom: 16,
    maxHeight: 36,
  },
  roundSelectorContent: {
    paddingRight: 16,
  },
  roundButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: COLORS.gray100,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonActive: {
    backgroundColor: COLORS.black,
  },
  roundButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.gray600,
  },
  roundButtonTextActive: {
    color: COLORS.white,
  },

  // Bracket Scroll
  bracketScroll: {
    flex: 1,
  },
  bracketContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  // Round Wrapper
  roundWrapper: {
    flexDirection: 'row',
  },

  // Round Column
  roundColumn: {
    position: 'relative',
    paddingHorizontal: ROUND_PADDING,
  },
  roundLabel: {
    backgroundColor: COLORS.gray50,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  roundLabelText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  // Match Container
  matchContainer: {
    // Position set dynamically
  },

  // Connector Column
  connectorColumn: {
    position: 'relative',
  },
  connectorsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  connectorGroup: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  // Connector Lines
  horizontalLineLeft: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.gray300,
  },
  horizontalLineRight: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.gray300,
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: COLORS.gray300,
  },
});

export default TournamentBracket;
