Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  scope :api do
    resources :query_strings
  end
end
