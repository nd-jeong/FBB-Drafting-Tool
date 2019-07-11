class TeamPlayersController < ApplicationController
#   before_action :set_team_player, only: [:show, :update, :destroy, :create]

  # GET /team_players
  def index
    @team_players = TeamPlayer.all

    render json: @team_players
  end

  # GET /team_players/1
  def show
    render json: @team_player
  end

  # POST /team_players
  def create
    team = Team.find params[:team_id]

    team.team_players << TeamPlayer.new(team_player_params)

    render json: {team_player: team.team_players.last}
    # @team_player = TeamPlayer.new(team_player_params)

    # if @team_player.save
    #   render json: @team_player, status: :created, location: @team_player
    # else
    #   render json: @team_player.errors, status: :unprocessable_entity
    # end
  end

  # PATCH/PUT /team_players/1
  def update
    if @team_player.update(team_player_params)
      render json: @team_player
    else
      render json: @team_player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /team_players/1
  def destroy
    @team_player.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_team_player
    #   @team_player = TeamPlayer.find(params[:id])
    # end

    # Only allow a trusted parameter "white list" through.
    def team_player_params
      params.require(:team_player).permit(:first_name, :last_name, :position, :points, :assists, :rebounds, :threes, :field_goal_pct, :free_throw_pct, :steals, :blocks, :turnovers, :team_id)
    end
end
