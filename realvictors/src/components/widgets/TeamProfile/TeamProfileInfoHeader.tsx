/**
 * TeamProfileInfoHeader Component
 *
 * Team profile header matching user profile design pattern:
 * - Team photo banner with overlapping logo
 * - Team name with verification
 * - Leagues with overlapping logos and popup (like teams in user profile)
 * - Gold line indicators for: Nationality, Squad Count, Sport
 * - Followers + Follow button on one line
 */

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { VerificationIcon } from '../../icons';

interface Nationality {
  name: string;
  flag: ImageSourcePropType;
}

interface League {
  name: string;
  logo?: ImageSourcePropType;
}

interface TeamProfileInfoHeaderProps {
  teamLogo: ImageSourcePropType;
  teamName: string;
  shortName: string;
  isVerified: boolean;
  nationality: Nationality;
  leagues: League[];
  sport: 'soccer' | 'basketball';
  teamPhoto?: ImageSourcePropType;
  squadCount?: number;
  followers?: string;
  onFollowersPress?: () => void;
  onFollowPress?: () => void;
  isFollowing?: boolean;
}

export const TeamProfileInfoHeader: React.FC<TeamProfileInfoHeaderProps> = ({
  teamLogo,
  teamName,
  shortName,
  isVerified,
  nationality,
  leagues,
  sport,
  teamPhoto,
  squadCount = 0,
  followers = '0',
  onFollowersPress,
  onFollowPress,
  isFollowing = false,
}) => {
  // Show up to 3 leagues
  const displayLeagues = leagues.slice(0, 3);

  // State for leagues popup
  const [showAllLeagues, setShowAllLeagues] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle leagues click
  const handleLeaguesPress = () => {
    if (displayLeagues.length <= 1) return; // Don't show popup for single league

    setShowAllLeagues(true);

    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss after 2 seconds
    dismissTimerRef.current = setTimeout(() => {
      dismissPopup();
    }, 2000);
  };

  const dismissPopup = () => {
    // Clear timer if exists
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }

    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowAllLeagues(false);
    });
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Team Photo Banner - Standardized aspect ratio */}
      {teamPhoto && (
        <View style={styles.teamPhotoContainer}>
          <Image source={teamPhoto} style={styles.teamPhoto} resizeMode="cover" />

          {/* Team Logo overlapping */}
          <View style={styles.logoOverlay}>
            <View style={styles.logoShadow}>
              <View style={styles.logoContainer}>
                <Image source={teamLogo} style={styles.teamLogo} resizeMode="contain" />
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Team Name below photo, beside logo */}
      <View style={styles.teamNameSection}>
        <View style={styles.nameContainer}>
          <Text style={styles.teamName} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5}>
            {teamName}
          </Text>
          {isVerified && (
            <View style={styles.verificationBadge}>
              <VerificationIcon width={16} height={16} />
            </View>
          )}
        </View>
      </View>

      {/* Team Info Section */}
      <View style={styles.infoSection}>
        {/* Leagues - Overlapping logo stack with popup */}
        {displayLeagues.length > 0 && (
          <View>
            <TouchableOpacity
              style={styles.leaguesContainer}
              onPress={handleLeaguesPress}
              activeOpacity={displayLeagues.length > 1 ? 0.7 : 1}
              disabled={displayLeagues.length <= 1}
            >
              {/* Overlapping league logos */}
              <View style={styles.leagueLogosStack}>
                {displayLeagues.map((league, index) => (
                  <View
                    key={index}
                    style={[
                      styles.leagueLogoContainer,
                      { marginLeft: index > 0 ? -8 : 0, zIndex: displayLeagues.length - index },
                    ]}
                  >
                    {league.logo ? (
                      <Image source={league.logo} style={styles.leagueLogo} resizeMode="contain" />
                    ) : (
                      <Text style={styles.leagueInitial}>{league.name.charAt(0)}</Text>
                    )}
                  </View>
                ))}
              </View>

              {/* League name(s) */}
              <View style={styles.leagueNamesContainer}>
                <Text style={styles.leagueName} numberOfLines={1}>
                  {displayLeagues[0].name}
                </Text>
                {displayLeagues.length > 1 && (
                  <Text style={styles.additionalLeaguesText}>
                    +{displayLeagues.length - 1}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            {/* All Leagues Popup */}
            {showAllLeagues && (
              <Animated.View
                style={[
                  styles.leaguesPopup,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <View style={styles.leaguesPopupContent}>
                  <Text style={styles.leaguesPopupTitle}>All Leagues</Text>
                  <View style={styles.leaguesPopupList}>
                    {displayLeagues.map((league, index) => (
                      <View key={index} style={styles.leaguePopupItem}>
                        <View style={styles.leaguePopupLogoContainer}>
                          {league.logo ? (
                            <Image source={league.logo} style={styles.leaguePopupLogo} resizeMode="contain" />
                          ) : (
                            <Text style={styles.leaguePopupInitial}>{league.name.charAt(0)}</Text>
                          )}
                        </View>
                        <Text style={styles.leaguePopupName} numberOfLines={1}>
                          {league.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Animated.View>
            )}
          </View>
        )}

        {/* Info Grid (2x2) with Gold Lines */}
        <View style={styles.infoGrid}>
          {/* Row 1 */}
          <View style={styles.infoRow}>
            {/* Nationality */}
            <View style={[styles.infoItem, styles.infoItemHalf]}>
              <Text style={styles.infoLabel}>Nationality</Text>
              <View style={styles.nationalityItem}>
                <Image source={nationality.flag} style={styles.countryFlag} resizeMode="cover" />
                <Text style={styles.infoValue}>{nationality.name}</Text>
              </View>
            </View>

            {/* Squad Count */}
            <View style={[styles.infoItem, styles.infoItemHalf]}>
              <Text style={styles.infoLabel}>Squad</Text>
              <Text style={styles.infoValue}>{squadCount} Players</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.infoRow}>
            {/* Sport */}
            <View style={[styles.infoItem, styles.infoItemHalf]}>
              <Text style={styles.infoLabel}>Sport</Text>
              <Text style={styles.infoValue}>{sport === 'soccer' ? 'Soccer' : 'Basketball'}</Text>
            </View>

            {/* Followers */}
            <View style={[styles.infoItem, styles.infoItemHalf]}>
              <Text style={styles.infoLabel}>Followers</Text>
              <TouchableOpacity
                onPress={onFollowersPress}
                activeOpacity={onFollowersPress ? 0.7 : 1}
                disabled={!onFollowersPress}
              >
                <Text style={styles.infoValue}>{followers}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Follow Button - Full Width */}
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={onFollowPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },

  // Team Photo Section
  teamPhotoContainer: {
    width: '100%',
    height: 180, // Further reduced for more compact design
    position: 'relative',
    overflow: 'visible',
    backgroundColor: COLORS.black,
  },
  teamPhoto: {
    width: '100%',
    height: '100%',
  },

  // Team Logo Overlay
  logoOverlay: {
    position: 'absolute',
    bottom: -35,
    left: 15,
    zIndex: 10,
  },
  logoShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.black,
  },
  teamLogo: {
    width: 60,
    height: 60,
  },

  // Team Name Section (below photo, beside logo)
  teamNameSection: {
    backgroundColor: COLORS.black,
    paddingTop: 4,
    paddingBottom: 12,
    paddingLeft: 95, // Align with logo end (20 + 70 + 5)
    paddingRight: 20,
  },

  // Team Name
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 22,
    color: COLORS.white,
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  verificationBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Info Section
  infoSection: {
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },

  // Leagues - Similar to teams in user profile
  leaguesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 28,
  },
  leagueLogosStack: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
  },
  leagueLogoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  leagueLogo: {
    width: 24,
    height: 24,
  },
  leagueInitial: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.black,
  },
  leagueNamesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  leagueName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    flexShrink: 1,
  },
  additionalLeaguesText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray400,
  },

  // Leagues Popup
  leaguesPopup: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  leaguesPopupContent: {
    backgroundColor: COLORS.gray900,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  leaguesPopupTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 12,
  },
  leaguesPopupList: {
    gap: 10,
  },
  leaguePopupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leaguePopupLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  leaguePopupLogo: {
    width: 28,
    height: 28,
  },
  leaguePopupInitial: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.black,
  },
  leaguePopupName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    flex: 1,
  },

  // Info Grid (2x2) with Gold Lines
  infoGrid: {
    gap: 10,
    marginTop: 6,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoItem: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.goldAccent,
    paddingLeft: 10,
  },
  infoItemHalf: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 11,
    color: COLORS.gray400,
    marginBottom: 1,
    letterSpacing: -0.3,
  },
  infoValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  nationalityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  countryFlag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: COLORS.gray400,
  },

  // Follow Button - Full Width
  followButton: {
    backgroundColor: COLORS.goldAccent,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  followingButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  followButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
  },
  followingButtonText: {
    color: COLORS.black,
  },
});

export default TeamProfileInfoHeader;
