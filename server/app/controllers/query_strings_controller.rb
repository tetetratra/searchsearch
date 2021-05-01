class QueryStringsController < ApplicationController
  def create
    user = User.all.first
    url = Url.find(params[:url_id])
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

  private

  def query_strings_params
    params.permit(
      :url_id,
      :key,
      :description
    )
  end
end
