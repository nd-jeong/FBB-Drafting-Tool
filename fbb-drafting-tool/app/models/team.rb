class Team < ApplicationRecord
  belongs_to :league
  has_many :team_players
end
