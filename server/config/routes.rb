Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  scope :api do
    resources :paths, only: :index
    get 'paths/:path', to: 'paths#show', constraints: { path: /.+/ }
    get 'logged_in', to: 'application#logged_in'
  end

  root to: redirect(ApplicationController::FRONT_HOME_URL, status: 302)
end
