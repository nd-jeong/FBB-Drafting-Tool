class LeaguesController < ApplicationController
  before_action :set_league, only: [:show, :update, :destroy]

  # GET /leagues
  def index
    @leagues = League.all

    render json: @leagues
  end

  # GET /leagues/1
  def show
    render json: @league
  end

  # POST /leagues
  def create
    @league = League.new(league_params)

    if @league.save
      render json: @league, status: :created, location: @league
    else
      render json: @league.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /leagues/1
  def update
    if @league.update(league_params)
      render json: @league
    else
      render json: @league.errors, status: :unprocessable_entity
    end
  end

  # DELETE /leagues/1
  def destroy
    @league.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_league
      @league = League.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def league_params
      params.require(:league).permit(:league_name, :num_teams, :num_players, :pg_num, :g_num, :sg_num, :sf_num, :f_num, :pf_num, :c_num, :util_num, :bench_num, :user_id)
    end
end
