class ApplicationController < ActionController::API
  rescue_from StandardError do |e|
    render json: { error: '内部エラーが起きました' }, status: :unprocessable_entity
  end
end
