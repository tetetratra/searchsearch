class QueryStringKeysController < ApplicationController
  skip_before_action :auth_user, only: [:create]

  def create
    query_string_key = QueryStringKey.new(path_id: params[:path_id], key: params[:key])
    if query_string_key.save
      render json: nil, status: :ok
    else
      render json: { error: query_string_key.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
