Rails.application.routes.draw do
  resources :team_players
  resources :available_players
  resources :teams
  resources :leagues
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end