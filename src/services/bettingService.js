import { supabase } from '@/lib/supabase';

export const bettingService = {
  // Test function to check if place_bet function exists
  async testFunction() {
    try {
      const { data, error } = await supabase
        .rpc('place_bet', {
          p_user_id: '00000000-0000-0000-0000-000000000000',
          p_competition: 'test',
          p_date_time: 'test',
          p_home_team: 'test',
          p_away_team: 'test',
          p_odds: ['1.0', '1.0', '1.0'],
          p_wager: 1.0,
          p_chosen_result: 'HOME',
          p_net_payout: 1.0,
          p_match_link: 'test'
        });
      
      console.log('Function test result:', { data, error });
      return { data, error };
    } catch (err) {
      console.error('Function test error:', err);
      return { error: err };
    }
  },

  // Get user's current balance
  async getUserBalance(userId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('balance')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user balance:', error);
      return null;
    }

    return data.balance;
  },

  // Check if user has already bet on a specific match
  async hasExistingBet(userId, matchLink) {
    const { data, error } = await supabase
      .from('active_bets')
      .select('id')
      .eq('user_id', userId)
      .eq('match_link', matchLink)
      .single();

    return !error && data;
  },

  // Place a bet using the PostgreSQL function
  async placeBet(betData) {
    try {
      console.log('Placing bet with data:', betData);
      
      // First, check if user has already bet on this match
      const existingBet = await this.hasExistingBet(betData.userId, betData.matchLink);
      if (existingBet) {
        return { success: false, error: 'You have already bet on this match' };
      }

      // Check if user has sufficient balance
      const currentBalance = await this.getUserBalance(betData.userId);
      if (currentBalance === null) {
        return { success: false, error: 'Unable to fetch user balance' };
      }
      
      if (currentBalance < betData.wager) {
        return { success: false, error: 'Insufficient balance' };
      }

      // Insert the bet
      const { data: betData_result, error: betError } = await supabase
        .from('active_bets')
        .insert({
          user_id: betData.userId,
          competition: betData.competition,
          date_time: betData.dateTime,
          home_team: betData.homeTeam,
          away_team: betData.awayTeam,
          odds: betData.odds,
          wager: betData.wager,
          chosen_result: betData.chosenResult,
          net_payout: betData.netPayout,
          match_link: betData.matchLink
        })
        .select()
        .single();

      if (betError) {
        console.error('Error inserting bet:', betError);
        return { success: false, error: betError.message };
      }

      // Update user balance
      const { error: balanceError } = await supabase
        .from('user_profiles')
        .update({ 
          balance: currentBalance - betData.wager,
          updated_at: new Date().toISOString()
        })
        .eq('id', betData.userId);

      if (balanceError) {
        console.error('Error updating balance:', balanceError);
        return { success: false, error: balanceError.message };
      }

      return { success: true, new_balance: currentBalance - betData.wager };
    } catch (err) {
      console.error('Exception in placeBet:', err);
      return { success: false, error: err.message || 'Unknown error occurred' };
    }
  },

  // Get user's active bets
  async getActiveBets(userId) {
    const { data, error } = await supabase
      .from('active_bets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching active bets:', error);
      return [];
    }

    return data.map(bet => ({
      id: bet.id,
      competition: bet.competition,
      dateTime: bet.date_time,
      homeTeam: bet.home_team,
      awayTeam: bet.away_team,
      odds: bet.odds,
      wager: `$${bet.wager}`,
      chosenResult: bet.chosen_result,
      netPayout: `$${bet.net_payout}`,
      matchLink: bet.match_link
    }));
  },

  // Get user's past bets
  async getPastBets(userId) {
    const { data, error } = await supabase
      .from('past_bets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching past bets:', error);
      return [];
    }

    return data.map(bet => ({
      id: bet.id,
      competition: bet.competition,
      dateTime: bet.date_time,
      homeTeam: bet.home_team,
      awayTeam: bet.away_team,
      odds: bet.odds,
      actualResult: bet.actual_result,
      wager: `$${bet.wager}`,
      chosenResult: bet.chosen_result,
      netPayout: `$${bet.net_payout}`,
      matchLink: bet.match_link
    }));
  }
}; 