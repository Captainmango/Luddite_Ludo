Rails.application.routes.draw do
  devise_for :users, controllers: {sessions: "users/sessions",
                                  registrations: "users/registrations"
                                  }
  post "/games", to: "games#create"
  get "/games", to: "games#index"
  delete "/turns/:id", to: "turns#destroy"

  resources :games, only: [:show] do
    get "/turns", to: "turns#index"
    post "/turns", to: "turns#create"
  end


  
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
