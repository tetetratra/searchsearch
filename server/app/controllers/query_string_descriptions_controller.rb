class QueryStringDescriptionsController < ApplicationController
  skip_before_action :auth_user, only: [:create]

  def create
    query_string_description = QueryStringDescription.new(
      user_id: current_user&.id, query_string_key_id: params[:query_string_key_id], description: params[:description])
    if query_string_description.save
      render json: nil, status: :ok
    else
      render json: { error: query_string_description.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    query_string_description = current_user.query_string_descriptions.find(params[:id])
    query_string_description.destroy!
    render json: nil, status: :ok
  end
end
