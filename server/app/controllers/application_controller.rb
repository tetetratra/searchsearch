class ApplicationController < ActionController::Base
  FRONT_HOME_URL = 'http://localhost:3000/search'

  after_action :set_csrf_token_header
  before_action :auth_user
  skip_before_action :auth_user, only: [:logged_in]

  def logged_in
    render json: { logged_in: user_signed_in? }
  end

  protected

  def set_csrf_token_header
    response.set_header("X-CSRF-Token", form_authenticity_token)
  end

  def auth_user
    unless user_signed_in?
      if request.headers['content-type'] == "application/json"
        render json: { error: 'ログインしてください' }, status: :unprocessable_entity
      else
        redirect_to(FRONT_HOME_URL)
      end
    end
  end
end
