Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  scope :api do
    get 'logged_in', to: 'application#logged_in'
    resources :paths, only: [:index, :create]
    get 'paths/:path', to: 'paths#show', constraints: { path: /.+/ }
    resources :query_string_keys, only: [:create]
    resources :query_string_descriptions, only: [:create]
  end

  root to: redirect(ApplicationController::FRONT_HOME_URL, status: 302)
end
