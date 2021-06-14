class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from StandardError do |e|
    puts e.full_message if Rails.env == 'development'

    render json: { error: '内部エラーが起きました' }, status: :unprocessable_entity
  end
end
