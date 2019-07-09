require 'test_helper'

class AvailablePlayersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @available_player = available_players(:one)
  end

  test "should get index" do
    get available_players_url, as: :json
    assert_response :success
  end

  test "should create available_player" do
    assert_difference('AvailablePlayer.count') do
      post available_players_url, params: { available_player: { assists: @available_player.assists, blocks: @available_player.blocks, field_goal_pct: @available_player.field_goal_pct, first_name: @available_player.first_name, free_throw_pct: @available_player.free_throw_pct, last_name: @available_player.last_name, league_id: @available_player.league_id, points: @available_player.points, position: @available_player.position, rebounds: @available_player.rebounds, steals: @available_player.steals, threes: @available_player.threes, turnovers: @available_player.turnovers } }, as: :json
    end

    assert_response 201
  end

  test "should show available_player" do
    get available_player_url(@available_player), as: :json
    assert_response :success
  end

  test "should update available_player" do
    patch available_player_url(@available_player), params: { available_player: { assists: @available_player.assists, blocks: @available_player.blocks, field_goal_pct: @available_player.field_goal_pct, first_name: @available_player.first_name, free_throw_pct: @available_player.free_throw_pct, last_name: @available_player.last_name, league_id: @available_player.league_id, points: @available_player.points, position: @available_player.position, rebounds: @available_player.rebounds, steals: @available_player.steals, threes: @available_player.threes, turnovers: @available_player.turnovers } }, as: :json
    assert_response 200
  end

  test "should destroy available_player" do
    assert_difference('AvailablePlayer.count', -1) do
      delete available_player_url(@available_player), as: :json
    end

    assert_response 204
  end
end
