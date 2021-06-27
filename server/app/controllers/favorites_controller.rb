class FavoritesController < ApplicationController
  def create
    favorite = Favorite.find_or_initialize_by(user_id: current_user.id, query_string_id: params[:query_string_id])
    if favorite.save
      render json: nil, status: :ok
    else
      render json: { error: favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if favorite = Favorite.find_by(user_id: current_user.id, query_string_id: params[:query_string_id])
      favorite.destroy!
    end
    render json: nil, status: :ok
  end
end
