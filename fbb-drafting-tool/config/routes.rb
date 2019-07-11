Rails.application.routes.draw do
    resources :available_players
    
    resources :users do
        resources :leagues do 
            resources :teams do
                resources :team_players
            end
        end
    end
    post '/auth/login', to: 'authentication#login'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end