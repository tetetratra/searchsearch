class ApplicationController < ActionController::API
  rescue_from StandardError do |e|
    render 500
  end
end
