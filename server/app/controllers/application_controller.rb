class ApplicationController < ActionController::Base
  FRONT_HOME_URL = 'http://localhost:3000/search'
  # after_action :set_csrf_token_header

  # def set_csrf_token_header
  #   response.set_header("X-CSRF-Token", form_authenticity_token)
  # end

  before_action :auth_user

  def auth_user
    redirect_to(FRONT_HOME_URL) unless user_signed_in?
  end
end
