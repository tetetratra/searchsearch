Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  scope :api do
    resources :query_strings, only: [:index, :create, :destroy]
    resources :favorites, only: [:create]
    delete 'favorites', to: 'favorites#destroy'
    get 'logged_in', to: 'application#logged_in'
  end

  root to: redirect(ApplicationController::FRONT_HOME_URL, status: 302)
end
