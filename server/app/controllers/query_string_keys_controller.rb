class QueryStringKeysController < ApplicationController
  skip_before_action :auth_user, only: [:create]

  def create
    ApplicationRecord.transaction do
      query_string_key = QueryStringKey.create!(path_id: params[:path_id],
                                                key: params[:key])
      if params[:description].present?
        query_string_key.query_string_descriptions.create!(user_id: current_user&.id,
                                                           description: params[:description])
      end
      render json: nil, status: :ok
    rescue ActiveRecord::RecordInvalid => error
      render json: { error: error.record.errors.full_messages },
             status: :unprocessable_entity
    end
  end
end
