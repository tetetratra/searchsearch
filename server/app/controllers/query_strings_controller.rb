class QueryStringsController < ApplicationController
  skip_before_action :auth_user, only: [:index]

  def index
    queryStrings = QueryString
      .select(<<~SQL
        query_strings.*,
        users.*,
        COUNT(favorites.id) AS favorite_count
      SQL
      )
      .joins(:user)
      .joins('LEFT OUTER JOIN favorites ON favorites.query_strings_id = query_strings.id')
      .then { |r|
        query = params[:query]
        query_like = params[:prefixMatch] ? "#{query}%" : "%#{query}%"
        query ? r.where('path LIKE ?', query_like) : r
      }
      .then { |r|
        params[:author] ? r.where('users.name LIKE ?', "%#{author}%") : r
      }
      .then { |r|
        case params[:sort]
        when 'star' then r.order(favorite_count: :DESC)
        when 'new' then r.order(:created_at)
        when 'old' then r.order(created_at: :desc)
        else r.order(favorite_count: :DESC)
        end
      }
      .then { |r|
        author = params[:author]
        author ? r.where('users.name = ?', author) : r
      }
      .group('query_strings.id')
    render json: queryStrings
  end

  def create
    query_string = current_user.query_strings.new(query_strings_params)
    if query_string.save
      render json: nil, status: :ok
    else
      render json: { error: query_string.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    # TODO
  end

  private

  def query_strings_params
    params.permit(
      :path,
      :key,
      :description
    )
  end
end

