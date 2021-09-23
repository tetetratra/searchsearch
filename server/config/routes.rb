Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  scope :api do
    get 'user_info', to: 'application#user_info'
    get 'consume_messages', to: 'application#consume_messages'

    resources :paths, only: [:index, :create]
    get 'paths/:path', to: 'paths#show', constraints: { path: /.+/ }
    resources :query_string_keys, only: [:create]
    resources :query_string_descriptions, only: [:create, :destroy]
  end

  root to: redirect(ApplicationController::FRONT_HOME_URL, status: 302)
end
