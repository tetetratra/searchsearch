class QueryStringsController < ApplicationController
  # before_action :auth_user, only: [:create, :destroy]
  def index
    queryStrings = QueryString.all
    render json: queryStrings
  end

  def create
    user = User.all.first # TODO

    query_string = user.query_strings.new(query_strings_params)
    if query_string.save
      render json: {
        id: url.id,
        query_strings: url.query_strings
      }
    else
      render json: { error: query_string.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy

  end

  private

  def query_strings_params
    params.permit(
      :path,
      :key,
      :value,
      :description
    )
  end
end

