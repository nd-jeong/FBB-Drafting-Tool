User.create(email: "admin@fakemail.com", password: "admin123")

League.create(league_name: "Git Push Live", num_teams: 8, num_players: 13, pg_num: 1, g_num: 1, sg_num: 1, sf_num: 1, f_num: 1, pf_num: 1, c_num: 2, util_num: 2, bench_num:3, user_id: 1)

Team.create(team_name: "Foo Bar Fighters", draft_order: 1, league_id: 1)
Team.create(team_name: "Rage Against the Machine Learning", draft_order: 2, league_id: 1)
Team.create(team_name: "Armin Van Bootstrap", draft_order: 3, league_id: 1)
Team.create(team_name: "Cache Rules Everything Around Me", draft_order: 4, league_id: 1)
Team.create(team_name: "JSON Derulo", draft_order: 5, league_id: 1)
Team.create(team_name: "LinkedIn Park", draft_order: 6, league_id: 1)
Team.create(team_name: "Panic at the Distro", draft_order: 7, league_id: 1)
Team.create(team_name: "Slice Girls", draft_order: 8, league_id: 1)


def get_player_data(personId)
    require 'uri'
    require 'net/http'
    require 'openssl'
    require 'JSON'

    url = URI("http://data.nba.net/data/10s/prod/v1/2018/players/#{personId}_profile.json")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = false
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(url)

    response = http.request(request)
    
    parsed_json = JSON.parse(response.body)

    nba_league = parsed_json['league']

    std_leagues = nba_league['standard']

    stats = std_leagues['stats']

    reg_season = stats['regularSeason']

    season = reg_season['season']
    unless season.length == 0

        totals = season[0]['total']
        points = totals['ppg']
        rebounds = totals['rpg']
        assists = totals['apg']
        turnovers = totals['topg']
        steals = totals['spg']
        blocks = totals['bpg']
        threes = totals['tpm']
        field_goal_pct = totals['fgp']
        free_throw_pct = totals['ftp']
        games_played = totals['gamesPlayed']

        AvailablePlayer.create(first_name: @first_name, last_name: @last_name, position: @position, points: points, assists: assists, rebounds: rebounds, threes: threes, field_goal_pct: field_goal_pct, free_throw_pct: free_throw_pct, steals: steals, blocks: blocks, turnovers: turnovers, games_played: games_played, league_id: 1)
    end
end

require 'uri'
require 'net/http'
require 'openssl'
require 'JSON'  

url = URI("http://data.nba.net/data/10s/prod/v1/2018/players.json")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = false
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)

parsed_json = JSON.parse(response.body)

nba_league = parsed_json['league']

std_leagues = nba_league['standard']

std_leagues.each do |player|
    @first_name = player['firstName']
    @last_name = player['lastName']
    personId = player['personId']
    @position = player['pos']
    unless personId == "1" || personId == "1962937917"
        get_player_data(personId)
    end
end





