require 'test_helper'

class LeaguesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @league = leagues(:one)
  end

  test "should get index" do
    get leagues_url, as: :json
    assert_response :success
  end

  test "should create league" do
    assert_difference('League.count') do
      post leagues_url, params: { league: { bench_num: @league.bench_num, c_num: @league.c_num, f_num: @league.f_num, g_num: @league.g_num, league_name: @league.league_name, num_players: @league.num_players, num_teams: @league.num_teams, pf_num: @league.pf_num, pg_num: @league.pg_num, sf_num: @league.sf_num, sg_num: @league.sg_num, user_id: @league.user_id, util_num: @league.util_num } }, as: :json
    end

    assert_response 201
  end

  test "should show league" do
    get league_url(@league), as: :json
    assert_response :success
  end

  test "should update league" do
    patch league_url(@league), params: { league: { bench_num: @league.bench_num, c_num: @league.c_num, f_num: @league.f_num, g_num: @league.g_num, league_name: @league.league_name, num_players: @league.num_players, num_teams: @league.num_teams, pf_num: @league.pf_num, pg_num: @league.pg_num, sf_num: @league.sf_num, sg_num: @league.sg_num, user_id: @league.user_id, util_num: @league.util_num } }, as: :json
    assert_response 200
  end

  test "should destroy league" do
    assert_difference('League.count', -1) do
      delete league_url(@league), as: :json
    end

    assert_response 204
  end
end
