Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  scope :api do
    resources :query_strings
  end

  root to: redirect('http://localhost:3000/search')
end
