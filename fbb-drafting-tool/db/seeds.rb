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
        threes = totals['tpp']
        field_goal_pct = totals['fgp']
        free_throw_pct = totals['ftp']

        AvailablePlayer.create(first_name: @first_name, last_name: @last_name, position: @position, points: points, assists: assists, rebounds: rebounds, threes: threes, field_goal_pct: field_goal_pct, free_throw_pct: free_throw_pct, steals: steals, blocks: blocks, turnovers: turnovers, league_id: 1)
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





