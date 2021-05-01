class ApplicationController < ActionController::API
  def hello_world
    render json: { text: 'hello world' }
  end
end
