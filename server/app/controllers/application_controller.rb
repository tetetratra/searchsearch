class ApplicationController < ActionController::Base
  FRONT_HOME_URL = Rails.env.production? ? '/search' : 'http://localhost:3000/search'

  before_action :auth_user
  before_action :configure_permitted_parameters, if: :devise_controller?

  after_action :set_csrf_token_header

  skip_before_action :auth_user, only: [:logged_in]

  def logged_in
    render json: { logged_in: user_signed_in? }
  end

  def consume_flash
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

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end
