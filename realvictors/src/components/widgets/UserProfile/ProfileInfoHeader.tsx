/**
 * ProfileInfoHeader Component
 *
 * Displays user's profile information in Figma-inspired layout:
 * - Left side: Name, teams, and vertical info stack (hometown, height, position)
 * - Right side: Profile image (no background)
 * - Image positioned on divider between info and medal stats
 */

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { VerificationIcon } from '../../icons';

interface Team {
  name: string;
  logo: ImageSourcePropType;
}

interface Nationality {
  name: string;
  flag: ImageSourcePropType;
}

interface ProfileInfoHeaderProps {
  profileImage?: ImageSourcePropType;
  fullName: string;
  isVerified: boolean;
  teams: Team[];
  nationalities: Nationality[];
  height: string;
  position: string;
}

export const ProfileInfoHeader: React.FC<ProfileInfoHeaderProps> = ({
  profileImage,
  fullName,
  isVerified,
  teams,
  nationalities,
  height,
  position,
}) => {
  // Show all teams
  const displayTeams = teams.slice(0, 3); // Max 3 teams to avoid overcrowding

  // State for teams popup
  const [showAllTeams, setShowAllTeams] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle teams click
  const handleTeamsPress = () => {
    if (displayTeams.length <= 1) return; // Don't show popup for single team

    setShowAllTeams(true);

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
      setShowAllTeams(false);
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
      {/* Left Side - Info Section */}
      <View style={styles.leftSection}>
        {/* Name with Verification */}
        <View style={styles.nameRow}>
          <Text
            style={styles.fullName}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {fullName}
          </Text>
          {isVerified && (
            <View style={styles.verificationBadge}>
              <VerificationIcon width={18} height={18} />
            </View>
          )}
        </View>

        {/* Teams - Overlapping logo stack with name */}
        {displayTeams.length > 0 && (
          <View>
            <TouchableOpacity
              style={styles.teamsContainer}
              onPress={handleTeamsPress}
              activeOpacity={displayTeams.length > 1 ? 0.7 : 1}
              disabled={displayTeams.length <= 1}
            >
              {/* Overlapping team logos */}
              <View style={styles.teamLogosStack}>
                {displayTeams.map((team, index) => (
                  <View
                    key={index}
                    style={[
                      styles.teamLogoContainer,
                      { marginLeft: index > 0 ? -8 : 0, zIndex: displayTeams.length - index },
                    ]}
                  >
                    <Image source={team.logo} style={styles.teamLogo} resizeMode="contain" />
                  </View>
                ))}
              </View>

              {/* Team name(s) */}
              <View style={styles.teamNamesContainer}>
                <Text style={styles.teamName} numberOfLines={1}>
                  {displayTeams[0].name}
                </Text>
                {displayTeams.length > 1 && (
                  <Text style={styles.additionalTeamsText}>
                    +{displayTeams.length - 1} {displayTeams.length === 2 ? 'team' : 'teams'}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            {/* All Teams Popup */}
            {showAllTeams && (
              <Animated.View
                style={[
                  styles.teamsPopup,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <View style={styles.teamsPopupContent}>
                  <Text style={styles.teamsPopupTitle}>All Teams</Text>
                  <View style={styles.teamsPopupList}>
                    {displayTeams.map((team, index) => (
                      <View key={index} style={styles.teamPopupItem}>
                        <View style={styles.teamPopupLogoContainer}>
                          <Image source={team.logo} style={styles.teamPopupLogo} resizeMode="contain" />
                        </View>
                        <Text style={styles.teamPopupName} numberOfLines={1}>
                          {team.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Animated.View>
            )}
          </View>
        )}

        {/* Vertical Info Stack */}
        <View style={styles.infoStack}>
          {/* Nationality */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nationality</Text>
            <View style={styles.nationalitiesContainer}>
              {nationalities.slice(0, 4).map((nationality, index) => (
                <View key={index} style={styles.nationalityItem}>
                  <Image
                    source={nationality.flag}
                    style={nationalities.length > 2 ? styles.countryFlagOnly : styles.countryFlag}
                    resizeMode="cover"
                  />
                  {nationalities.length <= 2 && (
                    <Text style={styles.nationalityName}>{nationality.name}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Height */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{height}</Text>
          </View>

          {/* Position */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Position</Text>
            <Text style={styles.infoValue}>{position}</Text>
          </View>
        </View>
      </View>

      {/* Right Side - Profile Image (positioned on divider) */}
      <View style={styles.rightSection}>
        {profileImage && (
          <Image
            source={profileImage}
            style={styles.profileImage}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
    position: 'relative',
  },
  leftSection: {
    gap: 8,
    paddingRight: 110, // Space for the image on the right
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fullName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 22,
    color: COLORS.white,
    flexShrink: 1, // Only take needed space, keep icon close
    letterSpacing: -0.5,
  },
  verificationBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 28, // Fixed height to prevent layout shifts
  },
  teamLogosStack: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
  },
  teamLogoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.black, // Border to separate overlapping logos
  },
  teamLogo: {
    width: 24,
    height: 24,
  },
  teamNamesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    flexShrink: 1,
  },
  additionalTeamsText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray400,
  },
  teamsPopup: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  teamsPopupContent: {
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
  teamsPopupTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 12,
  },
  teamsPopupList: {
    gap: 10,
  },
  teamPopupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamPopupLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  teamPopupLogo: {
    width: 28,
    height: 28,
  },
  teamPopupName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    flex: 1,
  },
  infoStack: {
    gap: 10,
    marginTop: 6,
  },
  infoItem: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
    paddingLeft: 10,
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
  nationalitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  nationalityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countryFlag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: COLORS.gray400,
  },
  countryFlagOnly: {
    width: 32,
    height: 22,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: COLORS.gray400,
  },
  nationalityName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  rightSection: {
    position: 'absolute',
    right: 20,
    bottom: 0, // Position at the bottom, right at the divider
    width: 110,
    height: 160,
    zIndex: 10,
  },
  profileImage: {
    width: 110,
    height: 160,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    
    marginTop: 12, // Space after the content
    marginBottom: 0,
  },
});

export default ProfileInfoHeader;
