// Game Controller - Handles all game-related operations
import { dbService } from '../services/supabase';
import { Game, GameRSVP, GameFilters, CreateGameForm, User, Team } from '../types';

export class GameController {
  // Get games with optional filters
  static async getGames(filters?: GameFilters): Promise<Game[]> {
    try {
      const games = await dbService.getGames(filters);
      return games || [];
    } catch (error) {
      console.error('Get games error:', error);
      throw error;
    }
  }

  // Get single game by ID
  static async getGame(gameId: string): Promise<Game & { 
    host_user?: User; 
    host_team?: Team; 
    rsvps?: (GameRSVP & { user?: User; team?: Team })[];
    participant_count?: number;
  }> {
    try {
      const game = await dbService.getGame(gameId);
      
      if (!game) {
        throw new Error('Game not found');
      }

      // Calculate participant count
      const participantCount = game.rsvps?.filter(
        rsvp => rsvp.status === 'attending' || rsvp.status === 'confirmed'
      ).length || 0;

      return {
        ...game,
        participant_count: participantCount,
      };
    } catch (error) {
      console.error('Get game error:', error);
      throw error;
    }
  }

  // Create new game
  static async createGame(gameData: CreateGameForm, hostUserId?: string, hostTeamId?: string): Promise<Game> {
    try {
      const newGameData = {
        ...gameData,
        host_user_id: hostUserId || null,
        host_team_id: hostTeamId || null,
        status: 'open' as const,
        game_metadata: {},
      };

      const game = await dbService.createGame(newGameData);
      return game;
    } catch (error) {
      console.error('Create game error:', error);
      throw error;
    }
  }

  // Update game
  static async updateGame(gameId: string, updates: Partial<Game>, userId: string): Promise<Game> {
    try {
      // First check if user has permission to update this game
      const game = await dbService.getGame(gameId);
      
      if (!game) {
        throw new Error('Game not found');
      }

      // Check if user is the host or team admin
      const canUpdate = game.host_user_id === userId || 
        (game.host_team_id && await this.isTeamAdmin(game.host_team_id, userId));

      if (!canUpdate) {
        throw new Error('You do not have permission to update this game');
      }

      const updatedGame = await dbService.updateGame(gameId, updates);
      return updatedGame;
    } catch (error) {
      console.error('Update game error:', error);
      throw error;
    }
  }

  // Delete game
  static async deleteGame(gameId: string, userId: string): Promise<void> {
    try {
      // Check permissions first
      const game = await dbService.getGame(gameId);
      
      if (!game) {
        throw new Error('Game not found');
      }

      const canDelete = game.host_user_id === userId || 
        (game.host_team_id && await this.isTeamAdmin(game.host_team_id, userId));

      if (!canDelete) {
        throw new Error('You do not have permission to delete this game');
      }

      await dbService.deleteGame(gameId);
    } catch (error) {
      console.error('Delete game error:', error);
      throw error;
    }
  }

  // RSVP to game
  static async rsvpToGame(gameId: string, userId: string, status: 'attending' | 'declined'): Promise<GameRSVP> {
    try {
      // Check if user already has an RSVP
      const existingRSVP = await dbService.getUserRSVP(gameId, userId);

      if (existingRSVP) {
        // Update existing RSVP
        const updatedRSVP = await dbService.updateRSVP(existingRSVP.id, { status });
        return updatedRSVP;
      } else {
        // Create new RSVP
        const newRSVP = await dbService.createRSVP({
          game_id: gameId,
          user_id: userId,
          status,
          paid_cents: 0,
        });
        return newRSVP;
      }
    } catch (error) {
      console.error('RSVP to game error:', error);
      throw error;
    }
  }

  // Team RSVP to exhibition game
  static async teamRSVPToGame(gameId: string, teamId: string, userId: string): Promise<GameRSVP> {
    try {
      // Check if user is team admin
      const canRSVP = await this.isTeamAdmin(teamId, userId);
      
      if (!canRSVP) {
        throw new Error('You do not have permission to RSVP for this team');
      }

      // Check if team already has an RSVP
      const existingRSVP = await dbService.getUserRSVP(gameId, userId); // TODO: Update to support team RSVPs

      if (existingRSVP) {
        throw new Error('Team already has an RSVP for this game');
      }

      const newRSVP = await dbService.createRSVP({
        game_id: gameId,
        team_id: teamId,
        status: 'attending',
        paid_cents: 0,
      });

      return newRSVP;
    } catch (error) {
      console.error('Team RSVP to game error:', error);
      throw error;
    }
  }

  // Cancel RSVP
  static async cancelRSVP(gameId: string, userId: string): Promise<void> {
    try {
      const existingRSVP = await dbService.getUserRSVP(gameId, userId);

      if (!existingRSVP) {
        throw new Error('No RSVP found for this game');
      }

      await dbService.updateRSVP(existingRSVP.id, { status: 'declined' });
    } catch (error) {
      console.error('Cancel RSVP error:', error);
      throw error;
    }
  }

  // Get user's RSVPs
  static async getUserRSVPs(userId: string, status?: string): Promise<(GameRSVP & { game: Game })[]> {
    try {
      // This would need a custom query - simplified for now
      const games = await dbService.getGames();
      const userGames = games.filter(game => 
        game.rsvps?.some(rsvp => 
          rsvp.user_id === userId && 
          (!status || rsvp.status === status)
        )
      );

      return userGames.map(game => ({
        id: game.rsvps?.find(r => r.user_id === userId)?.id || '',
        game_id: game.id,
        user_id: userId,
        team_id: null,
        status: game.rsvps?.find(r => r.user_id === userId)?.status || 'attending',
        paid_cents: game.rsvps?.find(r => r.user_id === userId)?.paid_cents || 0,
        payment_intent_id: game.rsvps?.find(r => r.user_id === userId)?.payment_intent_id,
        created_at: game.rsvps?.find(r => r.user_id === userId)?.created_at || '',
        updated_at: game.rsvps?.find(r => r.user_id === userId)?.updated_at || '',
        game,
      }));
    } catch (error) {
      console.error('Get user RSVPs error:', error);
      throw error;
    }
  }

  // Search games
  static async searchGames(query: string, filters?: GameFilters): Promise<Game[]> {
    try {
      const games = await dbService.searchGames(query, filters);
      return games || [];
    } catch (error) {
      console.error('Search games error:', error);
      throw error;
    }
  }

  // Get games near location
  static async getGamesNearLocation(
    lat: number, 
    lng: number, 
    radiusKm: number = 25,
    filters?: Omit<GameFilters, 'location'>
  ): Promise<Game[]> {
    try {
      const locationFilters = {
        ...filters,
        location: {
          center: [lat, lng] as [number, number],
          radius: radiusKm,
        },
      };

      const games = await dbService.getGames(locationFilters);
      return games || [];
    } catch (error) {
      console.error('Get games near location error:', error);
      throw error;
    }
  }

  // Get games by sport
  static async getGamesBySport(sport: string): Promise<Game[]> {
    try {
      const games = await dbService.getGames({ sport: [sport] });
      return games || [];
    } catch (error) {
      console.error('Get games by sport error:', error);
      throw error;
    }
  }

  // Get games by type
  static async getGamesByType(gameType: string): Promise<Game[]> {
    try {
      const games = await dbService.getGames({ game_type: [gameType as any] });
      return games || [];
    } catch (error) {
      console.error('Get games by type error:', error);
      throw error;
    }
  }

  // Start game (change status to in_progress)
  static async startGame(gameId: string, userId: string): Promise<Game> {
    try {
      const updatedGame = await this.updateGame(gameId, { 
        status: 'in_progress',
        start_time: new Date().toISOString(),
      }, userId);

      return updatedGame;
    } catch (error) {
      console.error('Start game error:', error);
      throw error;
    }
  }

  // Complete game (change status to completed)
  static async completeGame(gameId: string, userId: string, finalScore?: any): Promise<Game> {
    try {
      const updates: Partial<Game> = { 
        status: 'completed',
        end_time: new Date().toISOString(),
      };

      if (finalScore) {
        updates.game_metadata = { ...updates.game_metadata, final_score: finalScore };
      }

      const updatedGame = await this.updateGame(gameId, updates, userId);
      return updatedGame;
    } catch (error) {
      console.error('Complete game error:', error);
      throw error;
    }
  }

  // Cancel game
  static async cancelGame(gameId: string, userId: string, reason?: string): Promise<Game> {
    try {
      const updates: Partial<Game> = { 
        status: 'cancelled',
      };

      if (reason) {
        updates.game_metadata = { ...updates.game_metadata, cancellation_reason: reason };
      }

      const updatedGame = await this.updateGame(gameId, updates, userId);
      return updatedGame;
    } catch (error) {
      console.error('Cancel game error:', error);
      throw error;
    }
  }

  // Get game participants
  static async getGameParticipants(gameId: string): Promise<(User | Team)[]> {
    try {
      const game = await dbService.getGame(gameId);
      
      if (!game?.rsvps) {
        return [];
      }

      const participants = game.rsvps
        .filter(rsvp => rsvp.status === 'attending' || rsvp.status === 'confirmed')
        .map(rsvp => rsvp.user || rsvp.team)
        .filter(Boolean);

      return participants;
    } catch (error) {
      console.error('Get game participants error:', error);
      throw error;
    }
  }

  // Check if user is team admin (helper method)
  private static async isTeamAdmin(teamId: string, userId: string): Promise<boolean> {
    try {
      const team = await dbService.getTeam(teamId);
      
      if (!team) {
        return false;
      }

      const userMember = team.members?.find(member => member.user_id === userId);
      return userMember?.role === 'owner' || userMember?.role === 'admin';
    } catch (error) {
      console.error('Check team admin error:', error);
      return false;
    }
  }

  // Get recommended games for user
  static async getRecommendedGames(userId: string): Promise<Game[]> {
    try {
      // Get user profile to understand preferences
      const profile = await dbService.getProfile(userId);
      
      if (!profile) {
        return [];
      }

      // Get games matching user's sports and location
      const filters: GameFilters = {
        sport: profile.primary_sports || [],
        status: 'open',
      };

      if (profile.coordinates) {
        filters.location = {
          center: [profile.coordinates.lat, profile.coordinates.lng],
          radius: 25, // 25km radius
        };
      }

      const games = await dbService.getGames(filters);
      return games || [];
    } catch (error) {
      console.error('Get recommended games error:', error);
      throw error;
    }
  }
}
