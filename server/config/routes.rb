Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  scope :api do
    resources :query_strings
  end

  root to: redirect(ApplicationController::FRONT_HOME_URL, status: 302)
end
