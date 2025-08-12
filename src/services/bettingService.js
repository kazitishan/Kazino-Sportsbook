import { supabase } from '@/lib/supabase';
import { getResult } from '@/utils/result';

export const bettingService = {
  // Get user's current balance from the database
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

  // Check if user has already placed a bet on a specific match
  async hasExistingBet(userId, matchLink) {
    const { data, error } = await supabase
      .from('active_bets')
      .select('id')
      .eq('user_id', userId)
      .eq('match_link', matchLink)
      .single();

    return !error && data;
  },

  // Place a new bet and deduct wager from user's balance
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

  // Get all active bets for a user
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

  // Get all past bets for a user with formatted payout display
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
      netPayout: bet.net_payout >= 0 ? `$${bet.net_payout}` : `-$${Math.abs(bet.net_payout)}`,
      matchLink: bet.match_link
    }));
  },

  // Settle all active bets by checking match results and moving to past bets
  async settleBets(userId) {
    try {
      // Get all active bets in reverse order (oldest first)
      const { data: activeBets, error: fetchError } = await supabase
        .from('active_bets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Error fetching active bets for settlement:', fetchError);
        return { success: false, error: 'Failed to fetch active bets' };
      }

      let settledCount = 0;
      const errors = [];

      // Process each bet
      for (const bet of activeBets) {
        try {
          // Get the match result
          const result = await getResult(bet.match_link);
          
          // Check if the match can be settled
          if (result === "Match is still being played" || result === "Match not played yet") {
            // Skip this bet - it can't be settled yet
            continue;
          }

          // Determine if the bet was won or lost
          const betWon = bet.chosen_result === result;
          
          // Calculate payout (if won, pay the net_payout; if lost, pay negative wager amount)
          const payout = betWon ? bet.net_payout : -bet.wager;
          const finalPayout = betWon ? bet.net_payout : -bet.wager;

          // Move bet to past_bets table with correct payout
          const { error: insertError } = await supabase
            .from('past_bets')
            .insert({
              user_id: bet.user_id,
              competition: bet.competition,
              date_time: bet.date_time,
              home_team: bet.home_team,
              away_team: bet.away_team,
              odds: bet.odds,
              wager: bet.wager,
              chosen_result: bet.chosen_result,
              net_payout: finalPayout, // Use the calculated payout (positive for wins, negative for losses)
              actual_result: result,
              match_link: bet.match_link
            });

          if (insertError) {
            console.error('Error moving bet to past_bets:', insertError);
            errors.push(`Failed to move bet ${bet.id}: ${insertError.message}`);
            continue;
          }

          // Delete from active_bets
          const { error: deleteError } = await supabase
            .from('active_bets')
            .delete()
            .eq('id', bet.id);

          if (deleteError) {
            console.error('Error deleting from active_bets:', deleteError);
            errors.push(`Failed to delete bet ${bet.id}: ${deleteError.message}`);
            continue;
          }

          // Update user balance (only for winning bets - losing bets already had wager deducted when placed)
          if (betWon) {
            const currentBalance = await this.getUserBalance(userId);
            if (currentBalance !== null) {
              const { error: balanceError } = await supabase
                .from('user_profiles')
                .update({ 
                  balance: currentBalance + payout,
                  updated_at: new Date().toISOString()
                })
                .eq('id', userId);

              if (balanceError) {
                console.error('Error updating balance after win:', balanceError);
                errors.push(`Failed to update balance for bet ${bet.id}: ${balanceError.message}`);
              }
            }
          }

          settledCount++;
        } catch (error) {
          console.error(`Error settling bet ${bet.id}:`, error);
          errors.push(`Failed to settle bet ${bet.id}: ${error.message}`);
        }
      }

      return { 
        success: true, 
        settledCount, 
        errors: errors.length > 0 ? errors : null 
      };
    } catch (error) {
      console.error('Error in settleBets:', error);
      return { success: false, error: error.message };
    }
  }
}; 