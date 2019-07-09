class League < ApplicationRecord
  belongs_to :user
  has_many :teams
  has_many :available_players
end
