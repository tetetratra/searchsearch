Rails.application.routes.draw do
  get 'urls/:path', to: 'urls#show', constraints: { path: /.*/ }
  resources :urls
  resources :query_strings
end
