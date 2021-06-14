Rails.application.routes.draw do
  scope :api do
    resources :query_strings
  end
end
