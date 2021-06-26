class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    'http://localhost:3000/search'
  end

  def after_sign_out_path_for(resource)
    'http://localhost:3000/search'
  end
end
