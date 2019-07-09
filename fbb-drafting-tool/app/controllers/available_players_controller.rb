class AvailablePlayersController < ApplicationController
  before_action :set_available_player, only: [:show, :update, :destroy]

  # GET /available_players
  def index
    @available_players = AvailablePlayer.all

    render json: @available_players
  end

  # GET /available_players/1
  def show
    render json: @available_player
  end

  # POST /available_players
  def create
    @available_player = AvailablePlayer.new(available_player_params)

    if @available_player.save
      render json: @available_player, status: :created, location: @available_player
    else
      render json: @available_player.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /available_players/1
  def update
    if @available_player.update(available_player_params)
      render json: @available_player
    else
      render json: @available_player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /available_players/1
  def destroy
    @available_player.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_available_player
      @available_player = AvailablePlayer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def available_player_params
      params.require(:available_player).permit(:first_name, :last_name, :position, :points, :assists, :rebounds, :threes, :field_goal_pct, :free_throw_pct, :steals, :blocks, :turnovers, :league_id)
    end
end
