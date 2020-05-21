Rails.application.routes.draw do
  devise_for :users, controllers: {sessions: "sessions",
                                  registrations: "registrations"
                                  }
  post "/games", to: "games#create"
  get "/games", to: "games#index"
  delete "/turns/:id", to: "turns#destroy"
  delete "/games/:id", to: "games#destroy"

  delete "users/:id", to: "registrations#destroy"
  delete "turns/:id", to: "turns#destroy"

  resources :games, only: [:show] do
    get "/turns", to: "turns#index"
    post "/turns", to: "turns#create"
  end



  
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
