import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPin, Clock, Users, DollarSign, Star } from 'lucide-react-native';
import { Game, User, Team, GameRSVP } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, SPORTS, GAME_TYPES, SKILL_LEVELS } from '../../constants';

interface GameCardProps {
  game: Game & {
    host_user?: User;
    host_team?: Team;
    participant_count?: number;
  };
  userRSVP?: GameRSVP;
  size?: 'compact' | 'expanded';
  onPress?: () => void;
  onRSVP?: (status: 'attending' | 'declined') => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  userRSVP,
  size = 'expanded',
  onPress,
  onRSVP,
}) => {
  const sportConfig = SPORTS[game.sport as keyof typeof SPORTS];
  const gameTypeConfig = GAME_TYPES[game.game_type as keyof typeof GAME_TYPES];
  const skillLevelConfig = SKILL_LEVELS[game.skill_level as keyof typeof SKILL_LEVELS];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getSpotsLeft = () => {
    if (!game.capacity) return null;
    const spotsLeft = game.capacity - (game.participant_count || 0);
    return Math.max(0, spotsLeft);
  };

  const spotsLeft = getSpotsLeft();
  const isAlmostFull = spotsLeft !== null && spotsLeft <= 3 && spotsLeft > 0;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  const getStatusColor = () => {
    if (isFull) return COLORS.error;
    if (isAlmostFull) return COLORS.warning;
    return COLORS.success;
  };

  const getStatusText = () => {
    if (isFull) return 'FULL';
    if (isAlmostFull) return `${spotsLeft} spots left`;
    if (spotsLeft !== null) return `${spotsLeft} spots available`;
    return 'Open';
  };

  const renderHeader = () => (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: SPACING.md 
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Sport Badge */}
        <View style={{
          backgroundColor: sportConfig?.colorLight || COLORS.goldLight,
          paddingHorizontal: SPACING.sm,
          paddingVertical: 4,
          borderRadius: BORDER_RADIUS.md,
          marginRight: SPACING.sm,
        }}>
          <Text style={{
            fontFamily: TYPOGRAPHY.fontFamily.semibold,
            fontSize: TYPOGRAPHY.fontSize.xs,
            color: COLORS.black,
          }}>
            {sportConfig?.name.toUpperCase() || game.sport.toUpperCase()}
          </Text>
        </View>
        
        {/* Game Type Badge */}
        <View style={{
          backgroundColor: gameTypeConfig?.color || COLORS.gold,
          paddingHorizontal: SPACING.sm,
          paddingVertical: 4,
          borderRadius: BORDER_RADIUS.md,
        }}>
          <Text style={{
            fontFamily: TYPOGRAPHY.fontFamily.semibold,
            fontSize: TYPOGRAPHY.fontSize.xs,
            color: COLORS.white,
          }}>
            {gameTypeConfig?.name.toUpperCase() || game.game_type.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Price */}
      {game.price_cents > 0 && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DollarSign size={14} color={COLORS.gold} />
          <Text style={{
            fontFamily: TYPOGRAPHY.fontFamily.semibold,
            fontSize: TYPOGRAPHY.fontSize.base,
            color: COLORS.gold,
            marginLeft: 2,
          }}>
            {(game.price_cents / 100).toFixed(0)}
          </Text>
        </View>
      )}
    </View>
  );

  const renderTitle = () => (
    <Text style={{
      fontFamily: TYPOGRAPHY.fontFamily.semibold,
      fontSize: size === 'compact' ? TYPOGRAPHY.fontSize.base : TYPOGRAPHY.fontSize.lg,
      color: COLORS.black,
      marginBottom: SPACING.sm,
    }} numberOfLines={size === 'compact' ? 1 : 2}>
      {game.title}
    </Text>
  );

  const renderHost = () => {
    const host = game.host_user || game.host_team;
    if (!host) return null;

    return (
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: SPACING.md 
      }}>
        <Image
          source={{ 
            uri: host.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
          }}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            marginRight: SPACING.sm,
          }}
        />
        <Text style={{
          fontFamily: TYPOGRAPHY.fontFamily.medium,
          fontSize: TYPOGRAPHY.fontSize.sm,
          color: COLORS.gray600,
        }}>
          Hosted by {host.display_name || host.name}
        </Text>
        {game.host_user?.verified && (
          <Star size={12} color={COLORS.gold} fill={COLORS.gold} style={{ marginLeft: 4 }} />
        )}
      </View>
    );
  };

  const renderDetails = () => (
    <View style={{ marginBottom: SPACING.md }}>
      {/* Date and Time */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: SPACING.sm 
      }}>
        <Clock size={14} color={COLORS.gray600} />
        <Text style={{
          fontFamily: TYPOGRAPHY.fontFamily.medium,
          fontSize: TYPOGRAPHY.fontSize.sm,
          color: COLORS.gray600,
          marginLeft: 6,
        }}>
          {formatDate(game.start_time)} • {formatTime(game.start_time)}
        </Text>
      </View>

      {/* Location */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: size === 'compact' ? 0 : SPACING.sm,
      }}>
        <MapPin size={14} color={COLORS.gray600} />
        <Text style={{
          fontFamily: TYPOGRAPHY.fontFamily.medium,
          fontSize: TYPOGRAPHY.fontSize.sm,
          color: COLORS.gray600,
          marginLeft: 6,
          flex: 1,
        }} numberOfLines={1}>
          {game.location_name}
        </Text>
      </View>
    </View>
  );

  const renderBottomRow = () => (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      {/* Participants */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Users size={14} color={COLORS.gray600} />
        <Text style={{
          fontFamily: TYPOGRAPHY.fontFamily.medium,
          fontSize: TYPOGRAPHY.fontSize.sm,
          color: COLORS.gray600,
          marginLeft: 6,
        }}>
          {game.participant_count || 0}{game.capacity ? `/${game.capacity}` : ''}
        </Text>
      </View>

      {/* Skill Level */}
      {game.skill_level && (
        <View style={{
          backgroundColor: skillLevelConfig?.color || COLORS.gray400,
          paddingHorizontal: SPACING.sm,
          paddingVertical: 4,
          borderRadius: BORDER_RADIUS.md,
        }}>
          <Text style={{
            fontFamily: TYPOGRAPHY.fontFamily.medium,
            fontSize: TYPOGRAPHY.fontSize.xs,
            color: COLORS.white,
          }}>
            {skillLevelConfig?.name.toUpperCase() || game.skill_level.toUpperCase()}
          </Text>
        </View>
      )}

      {/* Status */}
      <Text style={{
        fontFamily: TYPOGRAPHY.fontFamily.semibold,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: getStatusColor(),
      }}>
        {getStatusText()}
      </Text>
    </View>
  );

  const renderRSVPButton = () => {
    if (!onRSVP || game.status !== 'open') return null;

    const isAttending = userRSVP?.status === 'attending' || userRSVP?.status === 'confirmed';

    return (
      <View style={{ 
        marginTop: SPACING.md,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray200,
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: isAttending ? COLORS.success : COLORS.gold,
            paddingVertical: SPACING.sm,
            paddingHorizontal: SPACING.md,
            borderRadius: BORDER_RADIUS.md,
            alignItems: 'center',
          }}
          onPress={() => onRSVP(isAttending ? 'declined' : 'attending')}
        >
          <Text style={{
            fontFamily: TYPOGRAPHY.fontFamily.semibold,
            fontSize: TYPOGRAPHY.fontSize.sm,
            color: isAttending ? COLORS.white : COLORS.black,
          }}>
            {isAttending ? 'Cancel RSVP' : isFull ? 'Join Waitlist' : 'Join Game'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.md,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {renderHeader()}
      {renderTitle()}
      {size === 'expanded' && renderHost()}
      {renderDetails()}
      {renderBottomRow()}
      {size === 'expanded' && renderRSVPButton()}
    </TouchableOpacity>
  );
};
