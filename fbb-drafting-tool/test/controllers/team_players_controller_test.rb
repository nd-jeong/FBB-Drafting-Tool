require 'test_helper'

class TeamPlayersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @team_player = team_players(:one)
  end

  test "should get index" do
    get team_players_url, as: :json
    assert_response :success
  end

  test "should create team_player" do
    assert_difference('TeamPlayer.count') do
      post team_players_url, params: { team_player: { assists: @team_player.assists, blocks: @team_player.blocks, field_goal_pct: @team_player.field_goal_pct, first_name: @team_player.first_name, free_throw_pct: @team_player.free_throw_pct, last_name: @team_player.last_name, points: @team_player.points, position: @team_player.position, rebounds: @team_player.rebounds, steals: @team_player.steals, team_id: @team_player.team_id, threes: @team_player.threes, turnovers: @team_player.turnovers } }, as: :json
    end

    assert_response 201
  end

  test "should show team_player" do
    get team_player_url(@team_player), as: :json
    assert_response :success
  end

  test "should update team_player" do
    patch team_player_url(@team_player), params: { team_player: { assists: @team_player.assists, blocks: @team_player.blocks, field_goal_pct: @team_player.field_goal_pct, first_name: @team_player.first_name, free_throw_pct: @team_player.free_throw_pct, last_name: @team_player.last_name, points: @team_player.points, position: @team_player.position, rebounds: @team_player.rebounds, steals: @team_player.steals, team_id: @team_player.team_id, threes: @team_player.threes, turnovers: @team_player.turnovers } }, as: :json
    assert_response 200
  end

  test "should destroy team_player" do
    assert_difference('TeamPlayer.count', -1) do
      delete team_player_url(@team_player), as: :json
    end

    assert_response 204
  end
end
